# questions.py
# routers/questions.py
from fastapi import APIRouter, Depends, HTTPException
from typing import List
from crud import question as crud_question
from schemas.question import QuestionPublic, AnswerPayload
from schemas.user import UserPublic
from core.dependencies import get_current_user
from services import gamification_service

router = APIRouter()

@router.get("/diagnostic", response_model=List[QuestionPublic])
async def get_diagnostic_questions():
    """ Retorna questões para o simulado de diagnóstico. """
    return await crud_question.get_diagnostic_questions(limit=5)

@router.post("/responder", status_code=200)
async def submit_answer(payload: AnswerPayload, current_user: UserPublic = Depends(get_current_user)):
    """ Endpoint para um usuário responder uma questão. """
    result = await gamification_service.process_user_answer(
        user_id=current_user.id,
        question_id=payload.question_id,
        answer_provided=payload.answer
    )
    if "error" in result:
        raise HTTPException(status_code=404, detail=result["error"])
    return result