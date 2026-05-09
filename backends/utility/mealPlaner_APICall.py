import instructor
from data_validation.schema import DietPlanResponse
from utility.mealPlaner_prompt import build_user_prompt, build_system_prompt
from db.supabase_client import create_supabase_client
from datetime import datetime, timezone, timedelta

client = instructor.from_provider("google/gemini-2.5-flash")



def get_user_details(clerk_id: str) -> bool:
    """
    Fetches user + onboarding data, generates a meal plan, and saves it.
    Returns True on success, False on any failure.

    start_date logic:
      - subscription_end is NULL  → first plan ever  → start today
      - subscription_end is set   → renewal           → start the day after it ends
    """
    supabase = create_supabase_client()

    try:
        # 1. Fetch user
        user = (
            supabase.table("user")
            .select("id, name, plan, subscription_end")
            .eq("clerk_id", clerk_id)
            .single()
            .execute()
        ).data

        user_id   = user["id"]
        user_name = user["name"]
        user_plan = user["plan"]   # "free" or "paid"

        # 2. Determine start date and plan length
        if user["subscription_end"]:
            prev_end   = datetime.fromisoformat(user["subscription_end"])
            start_date = (prev_end + timedelta(days=1)).strftime("%Y-%m-%d")
        else:
            start_date = datetime.now(timezone.utc).strftime("%Y-%m-%d")

        plan_duration_days = 3 if user_plan == "free" else 7

        # 3. Fetch onboarding answers joined with question text + type
        #    onboarding_answers.answer is jsonb (stored as a list of selected options)
        answers_rows = (
            supabase.table("onboarding_answers")
            .select("answer, onboarding_questions(question, question_type)")
            .eq("user_id", user_id)
            .execute()
        ).data

        # onboarding_data  → list of {type, question, answer} passed to the prompt builder
        # onboarding_answers → {question: answer} dict kept for calorie estimation
        onboarding_data    = []
        onboarding_answers = {}
        for row in answers_rows:
            q             = row["onboarding_questions"]
            raw_answer    = row["answer"]
            answer_str    = ", ".join(str(v) for v in raw_answer) if isinstance(raw_answer, list) else str(raw_answer)

            onboarding_data.append({
                "type":     q["question_type"],
                "question": q["question"],
                "answer":   answer_str,
            })
            onboarding_answers[q["question"]] = answer_str

        print("Fetched onboarding answer from mealPlaner_APICalls.py:", onboarding_answers)
        print("Fetched onboarding data from mealPlaner_APICaslls.py:", onboarding_data)

        # 4. Fetch user settings (camelCase column names from DB)
        settings_resp = (
            supabase.table("settings")
            .select("mealsPerDay, cusinPreference, cookingComplexity, budget, unitSystem, height_cm, weight_kg, age_year")
            .eq("userId", user_id)
            .execute()
        )
        raw = settings_resp.data[0] if settings_resp.data else {}

        # Remap to the keys that build_user_prompt() expects
        user_settings = {
            "mealperday":        raw.get("mealsPerDay",       3),
            "cusinepreferences": raw.get("cusinPreference",   "no preference"),
            "cookingComplexity": raw.get("cookingComplexity", "easy"),
            "budget":            raw.get("budget",            "low"),
            "unitSystem":        raw.get("unitSystem",        "metric"),
        }

        # 5. Estimate target daily calories
        # Prefer exact values from settings; fall back to onboarding range estimates
        target_daily_calories = _estimate_daily_calories(
            onboarding_answers,
            height_cm=raw.get("height_cm"),
            weight_kg=raw.get("weight_kg"),
            age=raw.get("age_year"),
        )

        # 6. Generate the plan via LLM
        diet_plan = generate_diet_plan(
            user_name=user_name,
            plan_duration_days=plan_duration_days,
            start_date=start_date,
            target_daily_calories=target_daily_calories,
            onboarding_data=onboarding_data,
            user_settings=user_settings,
        )
        if not diet_plan:
            return False

        # 7. Persist to DB
        return save_diet_plan(supabase, user_id, user_plan, diet_plan, onboarding_answers)

    except Exception as e:
        print("Error in get_user_details(), mealPlaner_APICall.py:", str(e))
        return False


_HEIGHT_CM = {
    "below 150 cm":     145,
    "150 to 159 cm":    155,
    "160 to 169 cm":    165,
    "170 to 179 cm":    175,
    "180 to 189 cm":    185,
    "190 plus":         193,
}

# BMI midpoints per category
_WEIGHT_BMI = {
    "underweight":  17.0,
    "healthy":      22.0,
    "overweight":   27.0,
    "obesity class 1": 32.0,
    "obesity class 2": 37.0,
    "obesity class 3": 42.0,
}

_AGE = {
    "0 to 9":   7,
    "10 to 19": 15,
    "15 to 24": 20,
    "25 to 59": 40,
    "60 and":   65,
}

_ACTIVITY = {
    "sedentary":   1.2,
    "lightly":     1.375,
    "moderately":  1.55,
    "very":        1.725,
}

_GOAL_ADJUSTMENT = {
    "lose weight":  -300,
    "gain muscle":  +300,
}


# For under-25 age groups: Mifflin-St Jeor doesn't apply (adult formula).
# Pediatric BMI categories are age-percentile-based, not fixed thresholds.
# Use WHO/DRI daily energy estimates keyed by (age_group, activity_level).
_PEDIATRIC_CALORIES = {
    # (age_key, activity_key) → kcal estimate
    ("0 to 9",   "sedentary"):   1200,
    ("0 to 9",   "lightly"):     1400,
    ("0 to 9",   "moderately"):  1600,
    ("0 to 9",   "very"):        1800,
    ("10 to 19", "sedentary"):   1800,
    ("10 to 19", "lightly"):     2000,
    ("10 to 19", "moderately"):  2200,
    ("10 to 19", "very"):        2600,
    ("15 to 24", "sedentary"):   1800,
    ("15 to 24", "lightly"):     2000,
    ("15 to 24", "moderately"):  2200,
    ("15 to 24", "very"):        2600,
}
_PEDIATRIC_AGE_KEYS = ("0 to 9", "10 to 19", "15 to 24")


def _estimate_daily_calories(
    onboarding_answers: dict,
    height_cm: float | None = None,
    weight_kg: float | None = None,
    age: int | None = None,
) -> int:
    """
    Estimates TDEE using Mifflin-St Jeor.
    Prefers exact values from settings (height_cm, weight_kg, age).
    Falls back to range-based onboarding estimates if settings values are not set yet.
    Under-25 with no exact age: uses WHO/DRI lookup table.
    """
    try:
        def _match(mapping: dict, answer: str):
            answer_lower = answer.lower()
            for key, val in mapping.items():
                if key in answer_lower:
                    return key, val
            return None, None

        activity_answer = onboarding_answers.get("How active are you daily?", "")
        goal_answer     = onboarding_answers.get("What is your primary health goal?", "")
        gender          = onboarding_answers.get("What is your gender?", "").lower()

        activity_key, multiplier = _match(_ACTIVITY, activity_answer)
        multiplier = multiplier or 1.55

        # --- Resolve age: exact from settings, else range from onboarding ---
        if age is None:
            age_answer      = onboarding_answers.get("What is your age group?", "")
            age_key, age    = _match(_AGE, age_answer)

            # Under-25 with no exact age → use lookup table (BMI ranges invalid for children)
            if age_key in _PEDIATRIC_AGE_KEYS:
                act_key      = activity_key or "moderately"
                base         = _PEDIATRIC_CALORIES.get((age_key, act_key), 2000)
                _, adjustment = _match(_GOAL_ADJUSTMENT, goal_answer)
                return max(1200, base + (adjustment or 0))

            age = age or 40

        # --- Resolve height: exact from settings, else range from onboarding ---
        if height_cm is None:
            height_answer  = onboarding_answers.get("What is your height?", "")
            _, height_cm   = _match(_HEIGHT_CM, height_answer)
            height_cm      = height_cm or 170

        # --- Resolve weight: exact from settings, else derive from BMI range + height ---
        if weight_kg is None:
            weight_answer = onboarding_answers.get("What is your weight?", "")
            _, bmi        = _match(_WEIGHT_BMI, weight_answer)
            bmi           = bmi or 22
            weight_kg     = bmi * ((height_cm / 100) ** 2)

        sex_constant = 5 if "male" in gender else -161 if "female" in gender else -78
        bmr  = 10 * weight_kg + 6.25 * height_cm - 5 * age + sex_constant
        tdee = bmr * multiplier

        _, adjustment = _match(_GOAL_ADJUSTMENT, goal_answer)
        return max(1200, int(tdee + (adjustment or 0)))

    except Exception:
        return 2000


def generate_diet_plan(
    user_name: str,
    plan_duration_days: int,
    start_date: str,
    target_daily_calories: int,
    onboarding_data: list,   # [{"type": ..., "question": ..., "answer": ...}]
    user_settings: dict,
    max_retries: int = 3,
) -> DietPlanResponse:

    user_prompt   = build_user_prompt(
        user_name=user_name,
        plan_duration_days=plan_duration_days,
        start_date=start_date,
        target_daily_calories=target_daily_calories,
        onboarding_data=onboarding_data,
        user_settings=user_settings,
    )
    system_prompt = build_system_prompt()

    response = client.chat.completions.create(
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user",   "content": user_prompt},
        ],
        response_model=DietPlanResponse,
        max_retries=max_retries,
    )
    print("LLM response from mealPlaner_APICalls.py:", response)
    return response


def save_diet_plan(
    supabase,
    user_id: str,
    user_plan: str,
    diet_plan: DietPlanResponse,
    onboarding_answers: dict,
) -> bool:
    """
    Persists DietPlanResponse across all related tables:
      diet_plan → diet_plan_days → diet_meals → usePlanProgress
    Also initializes userStreak (if not exists) and userMealTimes defaults.
    """
    try:
        # --- diet_plan ---
        plan_row = supabase.table("diet_plan").insert({
            "user_id":          user_id,
            "planDurationDays": diet_plan.plan_duration_days,
            "startDate":        diet_plan.start_date,
            "endDate":          diet_plan.end_date,
            "totalCalories":    diet_plan.total_calories,
            "planType":         diet_plan.plan_type,
            "generatedBy":      diet_plan.generated_by,
            "answermetadata":   onboarding_answers,
            "status":           "active",
        }).execute()
        print("diet_plan insert:", plan_row.data)

        plan_id = plan_row.data[0]["id"]

        for day in diet_plan.diet_plan:
            # --- diet_plan_days ---
            day_row = supabase.table("diet_plan_days").insert({
                "dietPlanId":     plan_id,
                "dayNumber":      day.day,
                "dayName":        day.weekday,
                "date":           day.date,
                "nutritionFocus": day.nutrition_focus,
                "dailyCalories":  day.daily_calories,
                "note":           day.notes,
                "status":         "pending",
            }).execute()
            print(f"diet_plan_days insert day {day.day}:", day_row.data)

            day_id = day_row.data[0]["id"]

            for order, meal_type in enumerate(day.meals.model_fields, start=1):
                meal = getattr(day.meals, meal_type)
                if meal is None:
                    continue

                # --- diet_meals ---
                meal_row = supabase.table("diet_meals").insert({
                    "dietDayId":      day_id,
                    "mealType":       meal_type,
                    "mealName":       meal_type.capitalize(),
                    "mealCalories":   meal.meal_calories,
                    "mealProtein":    meal.protein,
                    "mealCarbs":      meal.carbs,
                    "mealFats":       meal.fats,
                    "otherNutrition": {
                        "items":          [item.model_dump() for item in meal.items],
                        "micronutrients": meal.other_nutrients,
                    },
                    "mealOrder": order,
                }).execute()
                print(f"diet_meals insert {meal_type}:", meal_row.data)

                meal_id = meal_row.data[0]["id"]

                # --- usePlanProgress: one row per meal, isCompleted = false ---
                supabase.table("usePlanProgress").insert({
                    "user_id":      user_id,
                    "diet_plan_id": plan_id,
                    "diet_day_id":  day_id,
                    "diet_meal_id": meal_id,
                    "isCompleted":  False,
                }).execute()

        # --- userStreak: initialize only if no row exists yet ---
        existing_streak = (
            supabase.table("userStreak")
            .select("id")
            .eq("userId", user_id)
            .execute()
        )
        if not existing_streak.data:
            supabase.table("userStreak").insert({
                "userId":        user_id,
                "currentStreak": 0,
                "largestStreak": 0,
            }).execute()

        # --- userMealTimes: initialize defaults only if no rows exist yet ---
        existing_times = (
            supabase.table("userMealTimes")
            .select("id")
            .eq("userId", user_id)
            .execute()
        )
        if not existing_times.data:
            is_paid = user_plan == "paid"
            default_times = [
                {"mealOrder": 1, "mealName": "Breakfast", "mealTime": "08:00:00", "isActive": is_paid},
                {"mealOrder": 2, "mealName": "Lunch",     "mealTime": "13:00:00", "isActive": is_paid},
                {"mealOrder": 3, "mealName": "Dinner",    "mealTime": "19:00:00", "isActive": is_paid},
            ]
            for t in default_times:
                supabase.table("userMealTimes").insert({**t, "userId": user_id}).execute()

        return True

    except Exception as e:
        print("Error in save_diet_plan(), mealPlaner_APICall.py:", str(e))
        return False
