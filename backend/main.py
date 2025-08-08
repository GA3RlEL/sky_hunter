from fastapi import FastAPI
from amadeus import Client, ResponseError, Location
from dotenv import load_dotenv
import os

load_dotenv(dotenv_path=".env")

amadeus = Client(client_id=os.getenv("AMADEUS_CLIENT_ID"), client_secret=os.getenv("AMADEUS_CLIENT_SECRET"))
app = FastAPI()

@app.get("/")
async def root():
    try:
        response = amadeus.airport.direct_destinations.get(departureAirportCode='MAD')
        return response.data
    except ResponseError as e:
        return {"error": str(e)}

@app.get("/getiata/{airport_name}")
async def getiata(airport_name:str):
    try:
        response = amadeus.reference_data.locations.get(keyword=airport_name, subType=Location.ANY)
        return response.data
    except ResponseError as e:
        return {"error": str(e)}
