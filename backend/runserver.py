import uvicorn
import os
from dotenv import load_dotenv

load_dotenv()

if __name__ == "__main__":
  uvicorn.run("src:app", host=os.getenv("IP_ADDRESS"), port=8000, reload=True)