from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import select
from src.db.models import User
from .schemas import UserCreateModel
import bcrypt

class UserService:
    def __init__(self,session:AsyncSession):
        self.session = session

    async def get_all_books(self):
        statement = select(User)
        result = await self.session.exec(statement)
        return result.all()

    async def create_user(self, user_data: UserCreateModel):
        hashed_password = bcrypt.hashpw(user_data.password.encode('utf-8'), bcrypt.gensalt())
        user_data.password = hashed_password.decode('utf-8')

        new_user = User(**user_data.model_dump())
        

        self.session.add(new_user)
        await self.session.commit()
        await self.session.refresh(new_user)
        return new_user
    
    async def get_user(self, user_uid:str):
        statement = select(User).where(User.id == user_uid)
        result = await self.session.exec(statement)

        return result.first()
    
    async def update_user(self, user_uid:str, user_data: UserCreateModel):
        statement = select(User).where(User.id == user_uid)
        result = await self.session.exec(statement)

        user = result.first()

        for key, value in user_data.model_dump().items():
            setattr(user, key, value)

        await self.session.commit()
        return user

    async def delete_user(self, user_uid:str):
        statement = select(User).where(User.id == user_uid)
        result = await self.session.exec(statement)

        user = result.first()

        await self.session.delete(user)
        await self.session.commit()
        return None




