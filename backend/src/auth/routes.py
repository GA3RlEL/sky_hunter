from fastapi import APIRouter, Depends
from src.db.main import get_session
from sqlmodel.ext.asyncio.session import AsyncSession
from http import HTTPStatus
from .schemas import LoginModel
from .service import AuthService

login_router = APIRouter(prefix="/auth")

@login_router.post("/login", status_code=HTTPStatus.OK)
async def login(login_data:LoginModel ,session:AsyncSession = Depends(get_session), ):
  result = await AuthService(session).login(login_data)
  return result