from fastapi import FastAPI
from contextlib import asynccontextmanager
from src.db.main import init_db

@asynccontextmanager
async def lifespan(app: FastAPI):
  print("Server is starting")
  await init_db()
  yield
  print("Server is shutting down")

app = FastAPI(title="Sky hunter API", version="0.0.1" ,description="API for sky hunter project", lifespan=lifespan)

@app.get("/ping")
async def ping():
  return {"message":"pong"}