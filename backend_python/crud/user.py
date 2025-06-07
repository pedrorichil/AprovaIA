from core.database import database
from core.security import get_password_hash
from schemas.user import UserCreate, UserPublic

async def create_user(user: UserCreate) -> UserPublic:
    hashed_password = get_password_hash(user.senha)
    query = """
    INSERT INTO usuarios(nome_completo, email, senha_hash, id_plano_assinatura, id_mentor_escolhido)
    VALUES (:nome_completo, :email, :senha_hash, 1, 1)
    RETURNING id, nome_completo, email, xp_total, nivel, ofensiva_dias
    """
    values = user.model_dump()  # pega todas as chaves
    # Remove a chave 'senha' para não causar conflito
    if "senha" in values:
        del values["senha"]
    values["senha_hash"] = hashed_password
    new_user = await database.fetch_one(query=query, values=values)
    return UserPublic.model_validate(new_user)
