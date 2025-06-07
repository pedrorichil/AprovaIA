from pydantic import BaseModel
from typing import List, Any, Dict, Optional


class AnswerPayload(BaseModel):
    question_id: int
    answer: str

class AnswerResponse(BaseModel):
    foi_correta: bool
    xp_ganho: int
    resposta_correta: str
    texto_justificativa: Optional[str] = None

class QuestionPublic(BaseModel):
    id: int
    enunciado: str
    opcoes: List[Dict[str, Any]]

    class Config:
        from_attributes = True