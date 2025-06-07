from fastapi import APIRouter, Depends
from schemas.user import UserPublic
from core.dependencies import get_current_user

router = APIRouter()

@router.get("/me", response_model=UserPublic)
async def read_users_me(current_user: UserPublic = Depends(get_current_user)):
    return current_user
