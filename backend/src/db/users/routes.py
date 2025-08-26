from fastapi import APIRouter, Depends
from sqlmodel.ext.asyncio.session import AsyncSession
from src.db.main import get_session
from http import HTTPStatus

user_router = APIRouter(
    prefix="/users",
)

@user_router.get("/", status_code=HTTPStatus.OK)
async def read_users(session: AsyncSession = Depends(get_session)):
    pass


@user_router.post("/", status_code=HTTPStatus.CREATED)
async def create_user( session: AsyncSession = Depends(get_session)):
    pass


@user_router.get("/{id}", status_code=HTTPStatus.OK)
async def read_user(id: str, session: AsyncSession = Depends(get_session)):
    pass

@user_router.put("/{id}", status_code=HTTPStatus.OK)
async def update_book(id: str, session: AsyncSession = Depends(get_session)):
    pass

@user_router.delete("/{id}", status_code=HTTPStatus.NO_CONTENT)
async def delete_user(id: str, session: AsyncSession = Depends(get_session)):
    pass

