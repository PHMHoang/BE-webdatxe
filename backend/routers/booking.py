from fastapi import Body
from bson import ObjectId
from fastapi import APIRouter, HTTPException, Depends, Request
from typing import List
from .admin import get_current_admin
from models.booking import Booking
from models.booking_db import BookingDB
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
router = APIRouter()

def get_booking_db(request: Request):
    return BookingDB(request.app.state.db)

from fastapi.responses import JSONResponse

@router.post("/bookings")
async def create_booking(booking: Booking, request: Request):
    booking_db = get_booking_db(request)
    try:
        booking_data = await booking_db.create(booking)
        return JSONResponse(status_code=201, content={
            "success": True,
            "message": "Đặt lịch thành công!",
            "data": booking_data
        })
    except Exception as e:
        return JSONResponse(status_code=500, content={
            "success": False,
            "message": f"Đặt lịch thất bại: {str(e)}"
        })

@router.get("/bookings", response_model=List[Booking])
async def get_bookings(request: Request, admin: str = Depends(get_current_admin)):
    booking_db = get_booking_db(request)
    return await booking_db.get_all()


@router.put("/bookings/{booking_id}")
async def update_booking(booking_id: str, request: Request, booking: Booking = Body(...), admin: str = Depends(get_current_admin)):
    booking_db = get_booking_db(request)
    booking_dict = booking.dict(by_alias=True)
    booking_dict.pop("_id", None)
    try:
        object_id = ObjectId(booking_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid booking id")
    result = await request.app.state.db.bookings.update_one({"_id": object_id}, {"$set": booking_dict})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Booking not found")
    return {"success": True, "message": "Cập nhật booking thành công!"}

@router.delete("/bookings/{booking_id}")
async def delete_booking(booking_id: str, request: Request, admin: str = Depends(get_current_admin)):
    booking_db = get_booking_db(request)
    deleted = await booking_db.delete(booking_id)
    if deleted == 0:
        raise HTTPException(status_code=404, detail="Booking not found")
    return {"message": "Booking deleted"}
