from core.database import database
from schemas.squad import SquadCreate, SquadPublic

async def create_squad(squad: SquadCreate, user_id: int) -> SquadPublic:
    query = "INSERT INTO esquadroes (nome, id_objetivo) VALUES (:nome, :id_objetivo) RETURNING id, nome, id_objetivo"
    new_squad = await database.fetch_one(query=query, values=squad.model_dump())
    
    # Adiciona o criador como o primeiro membro
    query_member = "INSERT INTO usuarios_esquadroes(id_usuario, id_esquadrao, cargo) VALUES (:user_id, :squad_id, 'lider')"
    await database.execute(query=query_member, values={"user_id": user_id, "squad_id": new_squad['id']})
    
    return SquadPublic.model_validate(new_squad)