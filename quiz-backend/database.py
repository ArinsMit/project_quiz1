# Импортируем нужные модули
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Это как коробка, где мы будем хранить все наши модели (таблицы)
Base = declarative_base()

# Создаем модель для вопросов викторины
class QuizQuestion(Base):
    __tablename__ = 'quiz_questions'  # Название таблицы в базе данных
    
    # Поля таблицы:
    id = Column(Integer, primary_key=True)  # Уникальный номер вопроса
    question = Column(String)  # Текст вопроса
    option1 = Column(String)   # Вариант ответа 1
    option2 = Column(String)   # Вариант ответа 2
    option3 = Column(String)   # Вариант ответа 3
    option4 = Column(String)   # Вариант ответа 4
    correct_answer = Column(Integer)  # Номер правильного ответа (1-4)
    variant_id = Column(Integer)  # К какому варианту викторины относится вопрос

# Подключаемся к базе данных SQLite (это как тетрадка для записей)
# Если файла нет, он создастся автоматически
engine = create_engine('sqlite:///quiz.db')

# Создаем все таблицы в базе данных (если их еще нет)
Base.metadata.create_all(engine)
# Создаем "сессию" - это как ручка, которой мы будем писать в тетрадку
Session = sessionmaker(bind=engine)
session = Session()

# Добавляем несколько тестовых вопросов, если база пустая
if not session.query(QuizQuestion).first():
    questions = [
        QuizQuestion(
            question="Какая планета ближе всего к Солнцу?",
            option1="Венера",
            option2="Марс",
            option3="Меркурий",
            option4="Земля",
            correct_answer=3,
            variant_id=1
        ),
        QuizQuestion(
            question="Сколько будет 2+2?",
            option1="3",
            option2="4",
            option3="5",
            option4="6",
            correct_answer=2,
            variant_id=1
        ),
        # Можно добавить больше вопросов
    ]
    
    session.add_all(questions)
    session.commit()
