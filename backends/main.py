from fastapi import FastAPI

app = FastAPI()

@app.get("/getResponse")
def red_root():
    return {"data": "Hello expo !! from fastpi"}