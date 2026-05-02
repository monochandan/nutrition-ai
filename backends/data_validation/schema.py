from pydantic import BaseModel
from typing import List, Optional, Dict
class SignUpResponse(BaseModel):
  clerk_id: str
  email: str
  name: str
  imageurl: str
  plan: str
  isActive: bool
  onboarding_complete: bool

class SignUpRequest(BaseModel):
  '''
  From onboarding , when the post request send to the backend. 
  user.py , createUser()
  '''
  clerk_id: str
  email: str
  name: str
  imageurl: str
  plan: str
  isActive: bool
  onboarding_complete: bool

class userValidation(BaseModel):
  '''
  Validate the user for different task
  '''
  clerk_id: str
  email: str
  name: str
  onboarding_Complete: str

class OnboardingQuestion(BaseModel):
  ''' 
  After asking for question from the databse this is 
  the response model from query.py fetchOnboardingQuestions()
  '''
  id: str # question_id
  question: str
  options: List[str]
  # extra_information: str

class QuestionFetchingRequest(BaseModel):
  '''
  geting the response from onboarding fetchQuestions()
  only difference is the Image URL from SignUpRequest
  '''
  clerk_id: str
  email: str
  name: str
  # plan: str
  # isActive: bool
  # onboarding_complete: bool

class DefaultMessage(BaseModel):
    message: str

class OnboardingResponse(BaseModel):
    '''
    fetch the questions and send the response by this formate user.py
    '''
    data: Optional[List[OnboardingQuestion]] = None
    message: Optional[str] = None 


class AnswersValidation(BaseModel):
  '''
  validate the data(user answers) from onboarding.py to query.py
  '''
  # user_id: str
  # question_id: int
  # answers: List[str]
  answers: Dict[str, List[str]]

