from dotenv import load_dotenv
import os
from fastapi import APIRouter
import stripe

router = APIRouter(prefix="/api/paywall")


load_dotenv()

key = os.environ.get("STRIPE_SECRET_KEY")

client = stripe.StripeClient(key)

@router.post("/payment_sheet")
def payment_sheet():


