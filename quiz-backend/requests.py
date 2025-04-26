from fastapi import APIRouter
from database import session, QuizQuestion

# Создаем "маршрутизатор" - это как указатель, куда идти
router = APIRouter()

# Получить все варианты викторины
@router.get("/variants")
def get_variants():
    # Находим все уникальные variant_id из базы данных
    variants = session.query(QuizQuestion.variant_id).distinct().all()
    # Преобразуем результат в простой список чисел
    return {"variants": [v[0] for v in variants]}

# Получить вопросы для конкретного варианта
@router.get("/variant/{variant_id}")
def get_variant(variant_id: int):
    # Находим все вопросы для указанного варианта
    questions = session.query(QuizQuestion).filter_by(variant_id=variant_id).all()
    
    # Преобразуем вопросы в словари для отправки клиенту
    result = []
    for q in questions:
        result.append({
            "id": q.id,
            "question": q.question,
            "options": [q.option1, q.option2, q.option3, q.option4],
            "correct_answer": q.correct_answer
        })
    
    return {"questions": result}

# Проверить ответ на вопрос
@router.post("/check_answer/{question_id}")
def check_answer(question_id: int, selected_answer: int):
    # Находим вопрос в базе данных
    question = session.query(QuizQuestion).get(question_id)
    
    if not question:
        return {"error": "Question not found"}
    
    # Проверяем, правильный ли ответ
    is_correct = selected_answer == question.correct_answer
    
    return {
        "is_correct": is_correct,
        "correct_answer": question.correct_answer
    }
