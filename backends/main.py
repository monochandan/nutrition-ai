from fastapi import FastAPI, APIRouter
from db.supabase_client import create_supabase_client
from routes import user, query


app = FastAPI()

router = APIRouter()



@app.get("/getResponse")
def red_root():
    return {"data": "Hello expo !! from fastpi"}



app.include_router(user.router)
app.include_router(query.router)