from core.database import database

XP_POR_ACERTO = 15
NIVEIS_XP = {2: 100, 3: 250, 4: 500, 5: 800}

async def process_user_answer(user_id: int, question_id: int, answer_provided: str):
    query_question = "SELECT resposta_correta, texto_justificativa FROM questoes WHERE id = :id"
    question = await database.fetch_one(query=query_question, values={"id": question_id})
    
    if not question:
        return {"error": "Questão não encontrada."}

    foi_correta = (question['resposta_correta'].lower() == answer_provided.lower())
    
    # ... (Lógica para registrar resposta e dar XP) ...
    # ... (Lógica para verificar level up) ...
    
    return {
        "foi_correta": foi_correta, 
        "xp_ganho": XP_POR_ACERTO if foi_correta else 0,
        "resposta_correta": question['resposta_correta'],
        "texto_justificativa": question['texto_justificativa']
    }