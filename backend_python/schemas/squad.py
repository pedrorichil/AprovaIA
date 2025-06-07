from pydantic import BaseModel
from typing import Optional

class SquadCreate(BaseModel):
    nome: str
    id_objetivo: Optional[int] = None

class SquadPublic(BaseModel):
    id: int
    nome: str
    id_objetivo: Optional[int] = None

    class Config:
        from_attributes = True