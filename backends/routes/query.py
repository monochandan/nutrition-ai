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

question_answers = [

]
{
    1:["option1"], 
    2: ["option1", "option2"]
}

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
    # get the clerk metadata for that user
    user = clerk.users.get(user_id = data.clerk_id)
    print("User metadata from clerk user.py def fetchOnboardingQuestions(): ", user.public_metadata)

    if response.data["onboarding_complete"] == False:

        # fetch the question from database
        question_response = supabase.table("onboarding_questions").select("id, question, options").execute()
        print("Questions from database, query.py: ", question_response.data)

        questions =  question_response.data

        formatted_questions = [
            {
                "id": q["id"],
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
def userAnswersStore(data: AnswersValidation):

    print("Clerk ID userAnswersStore(): ", data.clerk_id)
    print("Answers from the fronend , query.py: ", data.data)


    supabase = create_supabase_client()

    # check if the user exist or not (by clerk_id)
    try:
        response = (
        supabase.table("user")
        .select("*")
        .eq("clerk_id", data.clerk_id)
        .single()
        .execute()
        )
        if response:

            print("user from database userAnswersStore query.py: ", response)

            if response.data["onboarding_complete"] == False:

                for key,value in data.data.items():
                    print("Question Id from query.py userAnswerStore(): ", key)
                    print("Answers from query.py userAnswerStore(): ", value)

                    insert_answers = (
                        supabase.table("onboarding_answers")
                        .insert(
                            {
                                'user_id': response.data["id"],
                                'question_id': key,
                                'answer': value,
                            }
                        ).execute()
                    )
                # if insert_answers.data:
                # update the user metadata
                user = clerk.users.update(
                    user_id = data.clerk_id,
                    public_metadata = {"onboarding_complete": True}
                )
                # After completed onboarding
                print("User metadata from clerk after done onboarding, user.py def userAnswersStore(): ", user.public_metadata)

                return DefaultMessage(message="Successfully stored user answers!")
                
    except Exception as e:
            print("Error from userAnswersStore(), query.py: ", str(e))
            return DefaultMessage(message="Could not store the data!")
    
    

    # question_answers = {questionId 1:["option1"], 2: ["option1", "option2"]}

    # return DefaultMessage(message = "Succesfully answered")
