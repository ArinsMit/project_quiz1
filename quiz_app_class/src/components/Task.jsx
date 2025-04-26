import { useState } from 'react';
import styles from './Task.module.css'; // Импорт стилей

function Task({ question, number }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [result, setResult] = useState(null);

  const handleSubmit = () => {
    if (selectedOption === null) return;
    
    fetch(`http://127.0.0.1:8000/api/check_answer/${question.id}?selected_answer=${selectedOption}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
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
    <div className={styles.task}>
      <h3>Вопрос {number}: {question.question}</h3>
      
      <div className={styles.options}>
        {question.options.map((option, idx) => (
          <div key={idx} className={styles.option}>
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
      
      <button 
        onClick={handleSubmit} 
        disabled={selectedOption === null}
        className={styles.button}
      >
        Проверить
      </button>
      
      {result && (
        <div className={`${styles.result} ${result.is_correct ? styles.correct : styles.wrong}`}>
          {result.is_correct ? 'Правильно! 🎉' : `Неправильно. Правильный ответ: ${question.options[result.correct_answer - 1]}`}
        </div>
      )}
    </div>
  );
}

export default Task;
