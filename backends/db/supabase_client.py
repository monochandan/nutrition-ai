import os
from dotenv import load_dotenv 
from supabase import Client, create_client

load_dotenv()

key_1 = os.environ.get("SUPABASE_URL")
key_2 = os.environ.get("SUPABASE_PUBLISHABLE_KEY")

print("Supabase url:", key_1)
print("Supabase publishable key: ", key_2)


def create_supabase_client():
    print("Supabase url:", key_1)
    print("Supabase publishable key: ", key_2)
    supabase: Client = create_client(
        os.environ.get("SUPABASE_URL"),
        os.environ.get("SUPABASE_PUBLISHABLE_KEY")
    )
    return supabase

