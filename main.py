from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from motor.motor_asyncio import AsyncIOMotorClient
from config.settings import settings
from routers import admin, booking

app = FastAPI()

# Allow CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB connection
client = AsyncIOMotorClient(settings.MONGO_URL)
app.state.db = client["car_booking"]

# Routers
app.include_router(admin.router)
app.include_router(booking.router)
