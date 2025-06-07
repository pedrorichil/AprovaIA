# question.py
from typing import List
from core.database import database
from schemas.question import QuestionPublic

async def get_diagnostic_questions(limit: int = 5) -> List[QuestionPublic]:
    # Lógica simplificada: busca questões aleatórias para o diagnóstico
    query = "SELECT * FROM questoes ORDER BY RANDOM() LIMIT :limit"
    rows = await database.fetch_all(query=query, values={"limit": limit})
    return [QuestionPublic.model_validate(row) for row in rows]