from pydantic import BaseModel

class SignUpResponse(BaseModel):
  clerk_id: str
  email: str
  name: str
  imageurl: str
  plan: str
  isActive: bool
  onboarding_complete: bool

class SignUpRequest(BaseModel):
  clerk_id: str
  email: str
  name: str
  imageurl: str
  plan: str
  isActive: bool
  onboarding_complete: bool