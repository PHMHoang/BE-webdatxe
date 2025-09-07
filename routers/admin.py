from fastapi import APIRouter, HTTPException, status, Depends
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
from config.settings import settings
from utils.jwt_token import create_access_token, decode_access_token
from services.admin_service import AdminService
from models.token import Token

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/admin/login")
router = APIRouter()

async def get_current_admin(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    payload = decode_access_token(token)
    if not payload or payload.get("sub") != settings.ADMIN_USERNAME:
        raise credentials_exception
    return payload["sub"]

@router.post("/admin/login", response_model=Token)
async def admin_login(form_data: OAuth2PasswordRequestForm = Depends()):
    if AdminService.authenticate(form_data.username, form_data.password):
        access_token = create_access_token({"sub": settings.ADMIN_USERNAME})
        return {"access_token": access_token, "token_type": "bearer"}
    raise HTTPException(status_code=400, detail="Incorrect username or password")
