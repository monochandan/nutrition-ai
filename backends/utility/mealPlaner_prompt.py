
from datetime import date, timedelta

def build_system_prompt():
    SYSTEM_PROMPT = """
    You are a certified clinical nutritionist and meal planning specialist with 15+ years 
    of experience creating personalized diet plans. You design plans that are realistic, 
    nutritionally balanced, and tailored to the individual's goals, lifestyle, and preferences.

    YOUR RESPONSIBILITIES:
    - Generate complete, day-by-day meal plans with precise nutritional values
    - Ensure variety across days — never repeat the same meal on consecutive days
    - Match the cooking complexity and budget constraints of the user
    - Strictly avoid any ingredients listed in allergies or restrictions
    - Respect the user's dietary type (vegan, keto, vegetarian, etc.)
    - Ensure daily_calories across all days sum exactly to total_calories
    - Ensure meal calories within each day sum exactly to daily_calories (±5 kcal tolerance)
    - Use the user's unit system (metric: grams/ml, imperial: oz/cups) for all quantities
    - Only include snack if meals_per_day is 4 or more
    - Vary nutrition_focus each day to ensure dietary diversity
    - Write practical, motivating notes tailored to the user's specific goal

    NUTRITION ACCURACY RULES:
    - Protein, carbs, fats must be realistic for the actual ingredients and quantities given
    - other_nutrients should include the 4-6 most relevant micronutrients for that meal
    - All nutrient values must be numbers; units go in the string value (e.g. "6g", "400IU")
    - meal_calories must be consistent with the macros (protein*4 + carbs*4 + fats*9 ≈ meal_calories)
    """

    return SYSTEM_PROMPT



def build_user_prompt(
    user_name: str,
    plan_duration_days: int,
    start_date: str,
    target_daily_calories: int,
    onboarding_data: list,  # [{"type": question_type, "question": question_text, "answer": answer_str}]
    user_settings: dict,
) -> str:

    end_date = (
        date.fromisoformat(start_date) + timedelta(days=plan_duration_days - 1)
    ).isoformat()

    # Build USER PROFILE lines dynamically from DB data:
    # format per line: "- {question_type} | {question}: {answer}"
    profile_lines = "\n".join(
        f"        - {item['type']} | {item['question']}: {item['answer']}"
        for item in onboarding_data
        if item.get("answer")
    )

    return f"""
        Generate a complete {plan_duration_days}-day personalized meal plan for this user.

        USER PROFILE:
        - Name: {user_name}
{profile_lines}

        USER PREFERENCES:
        - Meals per day: {user_settings.get('mealperday', 3)}
        - Cuisine preferences: {user_settings.get('cusinepreferences', 'no preference')}
        - Cooking complexity: {user_settings.get('cookingComplexity', 'easy')}
        - Budget: {user_settings.get('budget', 'low')} (low / medium / high)
        - Unit system: {user_settings.get('unitSystem', 'metric')}

        PLAN PARAMETERS:
        - Start date: {start_date}
        - End date: {end_date}
        - Duration: {plan_duration_days} days
        - Target daily calories: {target_daily_calories} kcal
        - Total plan calories: {target_daily_calories * plan_duration_days} kcal

        Generate the full {plan_duration_days}-day plan now. Every single day must be complete
        with all meals and nutritional details filled in.
        """