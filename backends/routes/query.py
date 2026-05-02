from fastapi import APIRouter, Header
from db.supabase_client import create_supabase_client
from data_validation.schema import AnswersValidation, OnboardingResponse, SignUpRequest, QuestionFetchingRequest, DefaultMessage
import os
from dotenv import load_dotenv 
from clerk_backend_api import Clerk

load_dotenv()

secret_key = os.environ.get("CLERK_SECRET_KEY")

clerk = Clerk(bearer_auth = secret_key)


router = APIRouter(prefix = "/api/userQuery")

# hardcode first, later fetch from supabase
ONBOARDING_QUESTIONS = [
    {
        "id": 1,
        "question": "What is your primary health goal?",
        "options": ["Lose Weight", "Gain Muscle", "Eat Healthier", "Manage a Condition", "Boost Energy"],
       #  "extra_information": "NOI NFO"
    },
    {
        "id": 2,
        "question": "How would you describe your current diet?",
        "options": ["Omnivore", "Vegetarian", "Vegan", "Keto", "Gluten-Free", "No specific diet"],
        # "extra_information": "NOI NFO"
    },
    {
        "id": 3,
        "question": "How active are you daily?",
        "options": ["Sedentary", "Lightly Active", "Moderately Active", "Very Active"],
        # "extra_information": "NOI NFO"
    },
]

@router.post("/fetchOnboardingQuestions", response_model = OnboardingResponse)
def fetchOnboardingQuestions(data: QuestionFetchingRequest):

    print("Clerk Secret Key (from routes/query.py): ", secret_key)
    print("Data from frontend query.py:", data)

    supabase = create_supabase_client()

    # check the user existence
    response = (
        supabase.table("user")
        .select("*")
        .eq("clerk_id", data.clerk_id)
        .single()
        .execute()
    )

    # print("Users from database query.py, fetchOnboardingQuestions(): ", response.data)
    print("Onboarding complete or not: ",  response.data["onboarding_complete"])
    # print("ONBOARDING_QUESTIONS: ", ONBOARDING_QUESTIONS)

    if response.data["onboarding_complete"] == False:

        # fetch the question from database
        question_response = supabase.table("onboarding_questions").select("question_id, question, options").execute()
        print("Questions from database, query.py: ", question_response.data)

        questions =  question_response.data

        formatted_questions = [
            {
                "id": q["question_id"],
                "question": q["question"],
                "options": [opt for opt in q["options"]]
            }

            for q in questions
        ]

        print("Formated Questions, query.py: ", formatted_questions)
        return OnboardingResponse(data = formatted_questions) 
        
    else:
       return OnboardingResponse(message = "Onboarding Completed")
        

@router.post("/userAnswersStore", response_model = DefaultMessage)
def userAnswersStore(clerk_id, data: AnswersValidation):

    print("Clerk ID: ", clerk_id)
    print("Answers from the fronend , rquery.py: ", data)


    supabase = create_supabase_client()

    # check if the user exist or not
    try:
        response = (
        supabase.table("user")
        .select("*")
        .eq("clerk_id", clerk_id)
        .single()
        .execute()
        )
        if response:

            if response.data["onboarding_complete"] == False:
                insert_answers = (
                    supabase.table("onboarding_answers")
                    .insert(
                        {
                            
                        }
                    )
                )
                
    except Exception as e:

    
    

    # question_answers = {1:["option1"], 2: ["option1", "option2"]}

    return DefaultMessage(message = "Succesfully answered")
