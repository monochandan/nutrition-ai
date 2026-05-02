from fastapi import APIRouter
from db.supabase_client import create_supabase_client

from data_validation.schema import SignUpResponse, SignUpRequest


router = APIRouter(prefix = "/api/auth")




@router.post("/createUser")
def createUser(data: SignUpRequest):
    supabase = create_supabase_client()
    message = ""
    print("supabase: ", supabase)
    print("data from verify page: ", data)
    try:
        response = (
            supabase.table('user')
            .insert({
                    'clerk_id' : data.clerk_id,
                    'email': data.email,
                    'name': data.name,
                    'imageURL': data.imageurl,
                    'plan': "free",
                    'isActive': False,
                    'onboarding_complete': False,
                    }).execute()

                )
        print("Response from userCreate: ", response)
        return {"message": "Success"}
        
    except Exception as e:
            print("Error from createUser catch:", str(e))
            return {"message": "Error"}