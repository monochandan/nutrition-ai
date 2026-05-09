from pydantic import BaseModel, Field
from typing import List, Optional, Dict
from datetime import datetime
class SignUpResponse(BaseModel):
  clerk_id: str
  email: str
  name: str
  imageurl: str
  plan: str
  isActive: bool
  onboarding_complete: bool

class SignUpRequest(BaseModel):
  '''
  From onboarding , when the post request send to the backend. 
  user.py , createUser()
  '''
  clerk_id: str
  email: str
  name: str
  imageurl: str
  plan: str
  isActive: bool
  onboarding_complete: bool

class userValidation(BaseModel):
  '''
  Validate the user for different task
  '''
  clerk_id: str
  email: str
  name: str
  onboarding_Complete: str

class OnboardingQuestion(BaseModel):
  ''' 
  After asking for question from the databse this is 
  the response model from query.py fetchOnboardingQuestions()
  '''
  id: str # question_id
  question: str
  options: List[str]
  # extra_information: str

class QuestionFetchingRequest(BaseModel):
  '''
  geting the response from onboarding fetchQuestions()
  only difference is the Image URL from SignUpRequest
  '''
  clerk_id: str
  email: str
  name: str
  # plan: str
  # isActive: bool
  # onboarding_complete: bool

class DefaultMessage(BaseModel):
     message: Optional[str]
     time: Optional[str] = None
     

class OnboardingResponse(BaseModel):
    '''
    fetch the questions and send the response by this formate user.py
    '''
    data: Optional[List[OnboardingQuestion]] = None
    message: Optional[str] = None 


class AnswersValidation(BaseModel):
  '''
  validate the data(user answers) from onboarding.py to query.py
  '''
  # user_id: str
  # question_id: int
  # answers: List[str]
  clerk_id: str
  data: Dict[str, List[str]]

class SubscriptionType(BaseModel):
   clerk_id:str
   plan: Optional[str] = None # free, paid


class PaymentIntentData(BaseModel):
   paymentIntent:str
   customerSessionClientSecret:str
   customer:str
   publishableKey:str

class PaymentSheetResponse(BaseModel):
    message: Optional[str] = None
    paymentIntent: Optional[PaymentIntentData] = None

class AccessChecker(BaseModel):
   accessGranted: bool = False
   message: str = "Problem Undefined"

class ClerkId(BaseModel):
   clerk_id : str



#### Diet Plan  from LLM #######


class MealItem(BaseModel):
    """Maps to mealitem table: itemname, itemquantity, unit"""
    name: str = Field(description="Food item name")
    quantity: str = Field(description="Amount as number or description, e.g. '2', '1/2 cup', '1 medium'")
    unit: str = Field(description="Unit of measurement, e.g. 'large', 'g', 'ml', 'tbsp'")


class Meal(BaseModel):
    """Maps to DietMeals table"""
    items: list[MealItem]
    protein: float = Field(description="Total protein in grams")
    carbs: float = Field(description="Total carbohydrates in grams")
    fats: float = Field(description="Total fats in grams")
    other_nutrients: dict[str, str] = Field(
        description="Key micronutrients with values and units, e.g. {'Fiber': '6g', 'Vitamin K': '90mcg'}"
    )
    meal_calories: int = Field(description="Total calories for this meal")


class DayMeals(BaseModel):
    breakfast: Meal
    lunch: Meal
    dinner: Meal
    snack: Optional[Meal] = Field(
        default=None,
        description="Include only if meals_per_day is 4 or more"
    )


class DietDay(BaseModel):
    """Maps to DietPlanDays table"""
    day: int = Field(description="Day number starting from 1")
    date: str = Field(description="Date in YYYY-MM-DD format")
    weekday: str = Field(description="Full weekday name, e.g. Monday")
    meals: DayMeals
    daily_calories: int = Field(description="Sum of all meal calories for this day")
    nutrition_focus: list[str] = Field(
        description="2-6 key nutritional themes for the day, e.g. ['High Protein', 'Omega-3']"
    )
    notes: str = Field(description="Nutritionist advice for this specific day")


class DietPlanResponse(BaseModel):
    """Maps to DietPlan table"""
    plan_type: str = Field(description="e.g. muscle_gain, weight_loss, maintenance, balanced")
    generated_by: str = Field(default="gemini-2.5-flash")
    start_date: str = Field(description="YYYY-MM-DD")
    end_date: str = Field(description="YYYY-MM-DD")
    plan_duration_days: int
    total_calories: int = Field(description="Sum of all daily_calories across the entire plan")
    diet_plan: list[DietDay]

   

