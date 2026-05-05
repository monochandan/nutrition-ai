# from queue import Full

import stripe 
import os
from dotenv import load_dotenv

load_dotenv()

secret_key = os.environ.get("STRIPE_SECRET_KEY")
publishable_key = os.environ.get("STRIPE_PUBLISHABLE_KEY")

client = stripe.StripeClient(secret_key)

# _sentinal = object()

def create_customer_session(amount, customer_id = None):
    
    if customer_id:
        '''
        if customer exist
        '''
        id = customer_id
    else:
        '''create new customer'''
        customer = client.customers.create(
                    # ADD INFO ABOUT THE USER INSIDE
                    # options={}
            )
        id = customer['id']
        
    customerSession = client.v1.customer_sessions.create(
         params={
            'customer': id,
            'components': {
                'mobile_payment_element': {
                'enabled': True,
                'features': {
                    'payment_method_save': 'enabled',
                    'payment_method_redisplay': 'enabled',
                    'payment_method_remove': 'enabled',
                },
                },
            },
            },
        )
        
    payment_intent_params = {
                'amount': int(amount*100),
                'currency': 'eur',
                'customer': id,
                'automatic_payment_methods': {
                'enabled': True,
            },
        }
    paymentIntent = client.v1.payment_intents.create(params=payment_intent_params)
    return {
                "paymentIntent":paymentIntent.client_secret,
                "customerSessionClientSecret":customerSession.client_secret,
                "customer":id,
                "publishableKey":publishable_key
            }
