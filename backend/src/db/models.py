from datetime import datetime

from sqlmodel import SQLModel, Field, Column
import sqlalchemy.dialects.postgresql as pg
from uuid import UUID, uuid4

class User(SQLModel, table=True):
    __tablename__ = "users"
    id: UUID = Field(
        sa_column=Column(pg.UUID, primary_key=True, unique=True, default=uuid4()),
       )
    first_name:str
    last_name:str
    email:str = Field(index=True, unique=True)
    password:str = Field(index=True)
    created_at:datetime = Field(default=datetime.now())
    updated_at:datetime = Field(default=datetime.now())

    def __repr__(self):
        return f"User => {self.first_name}"
