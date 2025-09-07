from pydantic import BaseModel, Field

class Booking(BaseModel):
    id: str = Field(default=None, alias="_id")
    name: str
    phone: str
    car: str
    date: str
    time: str
