from fastapi import FastAPI, APIRouter
from db.supabase_client import create_supabase_client
from routes import user
app = FastAPI()

router = APIRouter()

@app.get("/getResponse")
def red_root():
    return {"data": "Hello expo !! from fastpi"}



app.include_router(user.router)
