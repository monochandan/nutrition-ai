
#########################################################
# FastAPI splits request into:

# body → Pydantic model
# headers → Header()
# query → function params
# url → path params


############ 1111111 #####################
# axios.post("/createUser", {
#   name: "John"
# }, {
#   headers: {
#     Authorization: "Bearer token123"
#   }
# })


# from fastapi import Header
# from pydantic import BaseModel

# class User(BaseModel):
#     name: str

# @router.post("/createUser")
# def create_user(user: User, authorization: str = Header(None)):
#     print(user.name)          # from body
#     print(authorization)      # from header


################## 22222 ##################
# @app.get("/user/{user_id}")
# def get_user(user_id: str):
###########################################


################### 33333 ##########################
# Frontend:

# /users?limit=10

# def get_users(limit: int):
##############################################

#################################################################