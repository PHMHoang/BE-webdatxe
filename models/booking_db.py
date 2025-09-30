import boto3
import uuid
from typing import List
from models.booking import Booking
from config.settings import settings

class BookingDB:
    def __init__(self):
        self.dynamodb = boto3.resource('dynamodb', region_name=settings.AWS_REGION)
        self.table = self.dynamodb.Table(settings.DYNAMODB_TABLE_NAME)

    async def create(self, booking: Booking) -> dict:
        booking_dict = booking.dict(by_alias=True)
        booking_id = str(uuid.uuid4())
        booking_dict['booking_id'] = booking_id
        self.table.put_item(Item=booking_dict)
        return booking_dict

    async def get_all(self) -> List[dict]:
        response = self.table.scan()
        bookings = response.get('Items', [])
        return bookings

    async def delete(self, booking_id: str) -> int:
        response = self.table.delete_item(Key={'booking_id': booking_id})
        return 1 if response.get('ResponseMetadata', {}).get('HTTPStatusCode') == 200 else 0
