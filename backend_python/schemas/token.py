# token.py
from pydantic import BaseModel
from .user import UserPublic

from pydantic import BaseModel

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class TokenData(BaseModel):
    id: int