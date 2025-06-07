# objective.py
from typing import List
from core.database import database
from schemas.objective import ObjectivePublic

async def get_all_objectives() -> List[ObjectivePublic]:
    query = "SELECT * FROM objetivos ORDER BY nome"
    rows = await database.fetch_all(query=query)
    return [ObjectivePublic.model_validate(row) for row in rows]