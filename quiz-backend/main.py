from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from requests import router as quiz_router # добавили на уроке вместо предложенного дипсик
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

# Создаем приложение FastAPI - это как главный пульт управления
app = FastAPI(title="Викторина для детей")



# Разрешаем запросы из браузера (это важно для React)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Разрешаем все источники (для разработки)
    allow_credentials=True,
    allow_methods=["*"],  # Разрешаем все методы (GET, POST и т.д.)
    allow_headers=["*"],  # Разрешаем все заголовки
)

# Подключаем наши маршруты из requests.py
app.include_router(quiz_router, prefix="/api")

# Простой маршрут для проверки, что сервер работает
@app.get("/")
def read_root():
    return {"message": "Добро пожаловать в викторину!"}

if __name__ == '__main__':
    uvicorn.run(app=app, host="0.0.0.0", port=8000)
