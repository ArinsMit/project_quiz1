import { useState, useEffect } from 'react';
import Task from './Task';

function ViewVariant({ variantId, onBack }) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Загружаем вопросы для выбранного варианта
  useEffect(() => {
    fetch(`http://localhost:8000/api/variant/${variantId}`)
      .then(response => response.json())
      .then(data => {
        setQuestions(data.questions);
        setLoading(false);
      })
      .catch(error => {
        console.error('Ошибка:', error);
        setLoading(false);
      });
  }, [variantId]);

  if (loading) {
    return <div>Загрузка вопросов...</div>;
  }

  return (
    <div className="variant-view">
      <button onClick={onBack}>← Назад к списку</button>
      <h2>Вариант {variantId}</h2>
      
      <div className="questions">
        {questions.map((question, index) => (
          <Task 
            key={question.id} 
            question={question} 
            number={index + 1} 
          />
        ))}
      </div>
    </div>
  );
}

export default ViewVariant;
