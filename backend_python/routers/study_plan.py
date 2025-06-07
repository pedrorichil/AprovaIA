# routers/study_plan.py
from fastapi import APIRouter, HTTPException
from services import study_plan_service # Placeholder para o serviço de IA
from pydantic import BaseModel

router = APIRouter()

class PlanRequest(BaseModel):
    user_id: int
    objective_id: int

@router.post("/", status_code=201)
async def create_study_plan(request: PlanRequest):
    """
    Endpoint para criar um plano de estudo inicial após o diagnóstico.
    A lógica real de IA estaria no study_plan_service.
    """
    result = await study_plan_service.generate_initial_study_plan(
        user_id=request.user_id,
        objective_id=request.objective_id
    )
    if not result['success']:
        raise HTTPException(status_code=500, detail=result.get("error", "Falha ao gerar plano de estudo."))

    return {"message": "Plano de estudo criado com sucesso!", "plano_id": result['planoId']}