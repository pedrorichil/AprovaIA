# schemas/objective.py

from pydantic import BaseModel
from typing import Optional

class ObjectiveBase(BaseModel):
    title: str
    description: Optional[str] = None

class ObjectiveCreate(ObjectiveBase):
    pass

class ObjectivePublic(ObjectiveBase):
    id: int

    class Config:
        orm_mode = True
