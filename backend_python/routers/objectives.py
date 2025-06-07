# objectives.py
# routers/objectives.py
from fastapi import APIRouter, Depends, status
from typing import List
from crud import objective as crud_objective
from schemas.objective import ObjectiveCreate, ObjectivePublic
from core.dependencies import get_current_user # Importando a dependência
from schemas.user import UserPublic

router = APIRouter()

@router.get("/", response_model=List[ObjectivePublic])
async def get_all_objectives():
    """
    Retorna uma lista de todos os objetivos de estudo disponíveis.
    Este endpoint é público.
    """
    return await crud_objective.get_all_objectives()


@router.post("/", response_model=ObjectivePublic, status_code=status.HTTP_201_CREATED)
async def create_objective(
    objective: ObjectiveCreate,
    current_user: UserPublic = Depends(get_current_user) # Rota protegida
):
    """
    Cria um novo objetivo de estudo.
    **Requer autenticação.** (Apenas como exemplo de rota protegida)
    Em um sistema real, isso seria limitado a administradores.
    """
    # Aqui você poderia adicionar uma verificação se o current_user é um admin.
    return await crud_objective.create_new_objective(objective)