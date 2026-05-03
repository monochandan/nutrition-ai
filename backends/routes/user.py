from fastapi import APIRouter
from db.supabase_client import create_supabase_client

from data_validation.schema import SignUpResponse, SignUpRequest
from clerk_backend_api import Clerk
import os
from dotenv import load_dotenv

router = APIRouter(prefix = "/api/auth")



load_dotenv()

secret_key = os.environ.get("CLERK_SECRET_KEY")

clerk = Clerk(bearer_auth = secret_key)


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
        # get the clerk metadata for that user
        user = clerk.users.get(user_id = data.clerk_id)
        print("User metadata from clerk user.py createUser(): ", user.public_metadata)
        # update user metadata
        user = clerk.users.update(
             user_id = data.clerk_id,
             public_metadata = {"onboarding_complete": False, 'plan': 'free'}
        )
        # user = clerk.users.get(user_id = data.clerk_id)
        print("User metadata after updating the metadata from clerk user.py createUser(): ", user.public_metadata)
        print("Response from userCreate: ", response)
        return {"message": "Success"}
        
    except Exception as e:
            print("Error from createUser catch:", str(e))
            return {"message": "Error"}