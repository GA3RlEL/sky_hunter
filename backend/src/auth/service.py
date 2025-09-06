from sqlmodel.ext.asyncio.session import AsyncSession
from .schemas import LoginModel
from sqlmodel import select
from src.db.models import User
from bcrypt import checkpw
import jwt
import os
from dotenv import load_dotenv
from fastapi import HTTPException, status

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")


class AuthService:
  def __init__(self,session:AsyncSession):
    self.session = session

  async def login(self, login_data:LoginModel):
    statement = select(User).where(User.email == login_data.email)
    result = await self.session.exec(statement)
    user = result.first()


    if not user or not checkpw(login_data.password.encode('utf-8'), user.password.encode('utf-8')):
      raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password")




    token = jwt.encode({"user_id": str(user.id), "email":user.email}, SECRET_KEY, algorithm="HS256")
    return {"access_token": token, "token_type": "bearer"}