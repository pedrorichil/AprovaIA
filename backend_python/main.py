# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from core.config import settings
from core.database import database
from routers import auth, objectives, questions, study_plan, users, squads

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Backend da plataforma de estudos AprovaIA",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup():
    await database.connect()

@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()

# Incluindo as rotas da API
app.include_router(auth.router, prefix="/api/v1/auth", tags=["Autenticação"])
app.include_router(users.router, prefix="/api/v1/users", tags=["Usuários"])
app.include_router(objectives.router, prefix="/api/v1/objetivos", tags=["Objetivos"])
app.include_router(questions.router, prefix="/api/v1/questoes", tags=["Questões"])
app.include_router(study_plan.router, prefix="/api/v1/plano-estudo", tags=["Plano de Estudo"])
app.include_router(squads.router, prefix="/api/v1/esquadroes", tags=["Esquadrões"])

@app.get("/")
def read_root():
    return {"message": "Bem-vindo à API do AprovaIA 🚀"}