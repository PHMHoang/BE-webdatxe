
import os
from dotenv import load_dotenv
load_dotenv()

class Settings:
    SECRET_KEY: str = os.getenv("SECRET_KEY", "supersecretkey")
    ALGORITHM: str = os.getenv("ALGORITHM", "HS256")
    ADMIN_USERNAME: str = os.getenv("ADMIN_USERNAME", "admin")
    ADMIN_PASSWORD_HASH: str = os.getenv("ADMIN_PASSWORD_HASH", "$2b$12$wQw8Qw8Qw8Qw8Qw8Qw8QwOQw8Qw8Qw8Qw8Qw8Qw8Qw8Qw8Qw8Qw8")
    MONGO_URL: str = os.getenv("MONGO_URL", "mongodb://localhost:27017")

settings = Settings()
