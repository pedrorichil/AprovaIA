from fastapi import APIRouter, Depends, status
from typing import List
from schemas.squad import SquadCreate, SquadPublic
from schemas.user import UserPublic
from core.dependencies import get_current_user
from crud import squad as crud_squad

router = APIRouter()

@router.post("/", response_model=SquadPublic, status_code=status.HTTP_201_CREATED)
async def create_new_squad(squad: SquadCreate, current_user: UserPublic = Depends(get_current_user)):
    """ Cria um novo esquadrão de estudos. """
    return await crud_squad.create_squad(squad=squad, user_id=current_user.id)

# Outros endpoints de esquadrão (listar, entrar, etc.) seriam adicionados aqui