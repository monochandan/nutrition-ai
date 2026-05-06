from dotenv import load_dotenv
import os
from fastapi import APIRouter
import stripe
from data_validation.schema import SubscriptionType, DefaultMessage, PaymentSheetResponse, PaymentIntentData
from db.supabase_client import create_supabase_client

from datetime import datetime , timezone, timedelta
from utility.utility_stripe import create_customer_session

router = APIRouter(prefix="/api/paywall")


load_dotenv()

secret_key = os.environ.get("STRIPE_SECRET_KEY")
publishable_key = os.environ.get("STRIPE_PUBLISHABLE_KEY")

client = stripe.StripeClient(secret_key)

@router.get("/fetchPublishableKey")
def fetchPublishableKey():
     '''
     - check users subscription statement
     '''
     # check user subscription details
     return {"key": publishable_key}

@router.post("/payment_sheet")# response_model = PaymentSheetResponse)
def payment_sheet(data: SubscriptionType):

    '''
    this will call every time , when the payment required
        - new customer or recurring customer
        - type: free, weekly, yearly

    '''

    supabase = create_supabase_client()

    if data.plan == "yearly": # yearly
             amount = 29.99
    else: # monthly
             amount = 4.99 

    try:
        # check if the customer already exist under the same clerk id
        response = (
                supabase.table("user")
                .select("*")
                .eq("clerk_id", data.clerk_id)
                .execute()
             
             )
        print("Response from supabase check in payment_sheet, paywall.py: ", response)
        user = response.data[0]

        if user["stripe_customer_id"]:
             utility_response = create_customer_session(amount, user["stripe_customer_id"])
             print("Response from payment_sheet() if condition, paywall.py: ", utility_response)
             return utility_response
            #  return PaymentSheetResponse(paymentIntent = PaymentIntentData(
            #     paymentIntent=utility_response["paymentIntent"],
            #     customerSessionClientSecret=utility_response["customerSessionClientSecret"],
            #     customer=utility_response["customer"],
            #     publishableKey=utility_response["publishableKey"]
            #  ))
        else:
             utility_response = create_customer_session(amount) 
             # insert the newely create id
             print("Response from payment_sheet() else condition, paywall.py: ", utility_response)

             # add in the databse, the customer_id 
             return utility_response
            #  return PaymentSheetResponse(paymentIntent = PaymentIntentData(
            #     paymentIntent=utility_response["paymentIntent"],
            #     customerSessionClientSecret=utility_response["customerSessionClientSecret"],
            #     customer=utility_response["customer"],
            #     publishableKey=utility_response["publishableKey"]
            #  ))

        
        
    except Exception as e:
         print("Error from paywall.py payment_sheet(): ", str(e))
         return PaymentSheetResponse(message="Payment sheet generation problem")


# jsonify()

@router.post("/free_plan", response_model=DefaultMessage)
def free_plan(data: SubscriptionType):

    # check if the (plan is 'paid' then return free quto has used already) under this same user
    supabase = create_supabase_client()
    #plan = ""
    if data.plan == "trial":
        plan = "free"
    else:
         return DefaultMessage(message = "Wrong Plan selected")
    # check the user existence

    try:

        response = (
        supabase.table("user")
        .select("*")
        .eq("clerk_id", data.clerk_id)
        .eq("plan", plan)
        .single()
        .execute()
        )
        user = response.data
        
        if user["subscription_end"]: # if new user then NULL value check teh null value
            return DefaultMessage(message = "Failed")
        
        end_date = datetime.now(timezone.utc) + timedelta(days = 3)
        end_date_str = end_date.isoformat()
            
            # change the subscription_end_time
        change_subscription_date = (
                                supabase.table("user")
                                .update({"subscription_end": end_date_str})
                                .eq("clerk_id", data.clerk_id)
                                .execute()
            )
        end_date = str(end_date).split(".")[0]

        if change_subscription_date:
                # call LLM to generate the meal plan for three days on the user preferences (function_call)

                return DefaultMessage(message="Success", time=end_date)
        # else:
        #         return DefaultMessage(message = "Subscription problem") 
    
    except Exception as e:
        print("Error from catch free_plan(), paywall.py: ", str(e))
        return DefaultMessage(message = "Failed to get Free plan")
    



