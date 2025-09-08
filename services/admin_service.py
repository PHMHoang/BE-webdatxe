from config.settings import settings
from utils.security import verify_password

class AdminService:
    @staticmethod
    def authenticate(username: str, password: str) -> bool:
        return username == settings.ADMIN_USERNAME and verify_password(password, settings.ADMIN_PASSWORD_HASH)
