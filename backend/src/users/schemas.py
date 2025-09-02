from src.db.models import User
from pydantic import BaseModel
from uuid import UUID

class UserResponseModel(User):
    pass


class UserCreateModel(BaseModel):
    first_name:str
    last_name:str
    email:str
    password:str