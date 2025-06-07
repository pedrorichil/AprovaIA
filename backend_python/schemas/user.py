from pydantic import BaseModel, EmailStr
from typing import Optional

class UserBase(BaseModel):
    email: EmailStr
    nome_completo: str

class UserCreate(UserBase):
    senha: str

class UserPublic(UserBase):
    id: int
    xp_total: int
    nivel: int
    ofensiva_dias: int

    class Config:
        from_attributes = True