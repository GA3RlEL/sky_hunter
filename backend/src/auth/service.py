from sqlmodel.ext.asyncio.session import AsyncSession
from .schemas import LoginModel
from sqlmodel import select
from src.db.models import User
from bcrypt import checkpw
import jwt
import os
from dotenv import load_dotenv

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")


class AuthService:
  def __init__(self,session:AsyncSession):
    self.session = session

  async def login(self, login_data:LoginModel):
    statement = select(User).where(User.email == login_data.email)
    result = await self.session.exec(statement)
    user = result.first()


    if user and checkpw(login_data.password.encode('utf-8'), user.password.encode('utf-8')):
      token = jwt.encode({"user_id": str(user.id), "email":user.email}, SECRET_KEY, algorithm="HS256")
      return {"access_token": token, "token_type": "bearer"}



    return {"error": "Invalid email or password"}