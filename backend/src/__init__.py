from fastapi import FastAPI
from contextlib import asynccontextmanager
from src.db.main import init_db
from src.users.routes import user_router
from src.auth.routes import login_router

@asynccontextmanager
async def lifespan(app: FastAPI):
  print("Server is starting")
  await init_db()
  yield
  print("Server is shutting down")

app = FastAPI(title="Sky hunter API", version="0.0.1" ,description="API for sky hunter project", lifespan=lifespan)

app.include_router(user_router, tags=["users"])
app.include_router(login_router, tags=["auth"])