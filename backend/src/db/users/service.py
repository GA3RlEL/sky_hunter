from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import select
from src.db.models import User

class UserService:
    def __init__(self,session:AsyncSession):
        self.session = session

    async def get_all_books(self):
        statement = select(User)
        result = await self.session.exec(statement)
        return result.all()