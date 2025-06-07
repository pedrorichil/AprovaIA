from core.database import database
from core.security import verify_password  # função para validar hash da senha
from schemas.user import UserPublic

async def authenticate_user(email: str, password: str) -> UserPublic | None:
    query = "SELECT * FROM usuarios WHERE email = :email"
    user = await database.fetch_one(query=query, values={"email": email})
    if not user:
        return None
    if not verify_password(password, user["senha_hash"]):
        return None
    return UserPublic.model_validate(user)
