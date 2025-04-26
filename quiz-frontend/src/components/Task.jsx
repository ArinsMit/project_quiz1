import { useState } from 'react';

function Task({ question, number }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [result, setResult] = useState(null);

  const handleSubmit = () => {
    if (selectedOption === null) return;
    
    // Отправляем ответ на сервер для проверки
    fetch(`http://localhost:8000/api/check_answer/${question.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ selected_answer: selectedOption }),
    })
      .then(response => response.json())
      .then(data => {
        setResult(data);
      })
      .catch(error => {
        console.error('Ошибка:', error);
      });
  };

  return (
    <div className="task">
      <h3>Вопрос {number}: {question.question}</h3>
      
      <div className="options">
        {question.options.map((option, idx) => (
          <div key={idx} className="option">
            <label>
              <input
                type="radio"
                name={`question-${question.id}`}
                checked={selectedOption === idx + 1}
                onChange={() => setSelectedOption(idx + 1)}
              />
              {option}
            </label>
          </div>
        ))}
      </div>
      
      <button onClick={handleSubmit} disabled={selectedOption === null}>
        Проверить
      </button>
      
      {result && (
        <div className={`result ${result.is_correct ? 'correct' : 'wrong'}`}>
          {result.is_correct ? 'Правильно! 🎉' : `Неправильно. Правильный ответ: ${question.options[result.correct_answer - 1]}`}
        </div>
      )}
    </div>
  );
}

export default Task;
