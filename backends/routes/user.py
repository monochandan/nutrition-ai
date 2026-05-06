from fastapi import APIRouter
from db.supabase_client import create_supabase_client

from data_validation.schema import SignUpResponse, SignUpRequest, SubscriptionType, AccessChecker, ClerkId
from clerk_backend_api import Clerk
import os
from dotenv import load_dotenv

from datetime import datetime, timezone

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

@router.post("/userPlan_checker", response_model = AccessChecker)
def userPlan_checker(data:ClerkId):
     supabase = create_supabase_client()
     print("Data: ", data.clerk_id)
        #     class AccessChecker(BaseModel):
        #    accessGranted: bool
        #    message: str
    
     try:
        response = (
                supabase.table("user")
                .select("*")
                .eq("clerk_id", data.clerk_id)
                .single()
                .execute()
            )
        user = response.data
        if not user["isActive"]:
             return AccessChecker(accessGranted=False, message="Inactive User")
        if not user["subscription_end"]:
             return AccessChecker(accessGranted=False, message="No subscription")
        if datetime.now(timezone.utc) > user["subscription_end"]:
             return AccessChecker(accessGranted=False, message="Subscription expired")
        
        return AccessChecker(accessGranted=True, message="Access Granted")
     
     except Exception as e:
            print("Catch error in user_plan() user.py: ", str(e))
            return AccessChecker(accessGranted=False, message="Access Denied")

