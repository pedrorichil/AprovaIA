from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from core.database import database
from core.security import create_access_token
from schemas.user import UserCreate, UserPublic
from schemas.token import Token
from crud import user as crud_user
from crud import auth as crud_auth

router = APIRouter()

@router.post("/register", response_model=UserPublic, status_code=status.HTTP_201_CREATED)
async def register_user(user: UserCreate):
    existing_user = await database.fetch_one(
        "SELECT id FROM usuarios WHERE email = :email", values={"email": user.email}
    )
    if existing_user:
        raise HTTPException(status_code=409, detail="Este e-mail já está em uso.")
    return await crud_user.create_user(user)


@router.post("/login", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = await crud_auth.authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email ou senha inválidos",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(data={"sub": str(user.id)})
    return {"access_token": access_token, "token_type": "bearer"}
