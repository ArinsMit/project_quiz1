import { useState, useEffect } from 'react';
import ListVariant from './components/ListVariant';
import ViewVariant from './components/ViewVariant';

function App() {
  const [variants, setVariants] = useState([]); // Список вариантов викторины
  const [selectedVariant, setSelectedVariant] = useState(null); // Выбранный вариант
  const [loading, setLoading] = useState(true); // Загрузка данных

  // Загружаем варианты викторины при загрузке страницы
  useEffect(() => {
    fetch('/api/api/variants')
      .then(response => response.json())
      .then(data => {
        setVariants(data.variants);
        setLoading(false);
      })
      .catch(error => {
        console.error('Ошибка:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="app">
      <h1>Викторина для детей</h1>
      <p>делаем сами</p>
      
      {selectedVariant ? (
        <ViewVariant 
          variantId={selectedVariant} 
          onBack={() => setSelectedVariant(null)} 
        />
      ) : (
        <ListVariant 
          variants={variants} 
          onSelect={setSelectedVariant} 
        />
      )}
    </div>
  );
}

export default App;
