from motor.motor_asyncio import AsyncIOMotorDatabase
from typing import List
from models.booking import Booking

class BookingDB:
    def __init__(self, db: AsyncIOMotorDatabase):
        self.collection = db.bookings

    async def create(self, booking: Booking) -> dict:
        booking_dict = booking.dict(by_alias=True)
        booking_dict.pop("_id", None)
        result = await self.collection.insert_one(booking_dict)
        booking_dict["_id"] = str(result.inserted_id)
        return booking_dict

    async def get_all(self) -> List[dict]:
        bookings = []
        async for booking in self.collection.find():
            booking["_id"] = str(booking["_id"])
            bookings.append(booking)
        return bookings

    async def delete(self, booking_id: str) -> int:
        result = await self.collection.delete_one({"_id": booking_id})
        return result.deleted_count
