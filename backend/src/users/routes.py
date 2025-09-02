from fastapi import APIRouter, Depends
from sqlmodel.ext.asyncio.session import AsyncSession
from src.db.main import get_session
from http import HTTPStatus
from .service import UserService
from .schemas import UserCreateModel, UserResponseModel
from typing import List

user_router = APIRouter(
    prefix="/users",
)

@user_router.get("/", status_code=HTTPStatus.OK, response_model=List[UserResponseModel])
async def read_users(session: AsyncSession = Depends(get_session)):
    users = await UserService(session).get_all_books()
    return users


@user_router.post("/", status_code=HTTPStatus.CREATED)
async def create_user(user_create_data:UserCreateModel, session: AsyncSession = Depends(get_session)):
    new_user = await UserService(session).create_user(user_create_data)
    return new_user


@user_router.get("/{id}", status_code=HTTPStatus.OK)
async def read_user(id: str, session: AsyncSession = Depends(get_session)):
    user = await UserService(session).get_user(id)
    return user

@user_router.put("/{id}", status_code=HTTPStatus.OK)
async def update_book(id: str, user_data: UserCreateModel ,session: AsyncSession = Depends(get_session)):
    user = await UserService(session).update_user(id,user_data)
    return user

@user_router.delete("/{id}", status_code=HTTPStatus.NO_CONTENT)
async def delete_user(id: str, session: AsyncSession = Depends(get_session)):
    pass

