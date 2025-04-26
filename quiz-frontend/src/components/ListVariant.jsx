function ListVariant({ variants, onSelect }) {
    return (
      <div className="variant-list">
        <h2>Выберите вариант викторины:</h2>
        <ul>
          {variants.map(variant => (
            <li key={variant}>
              <button onClick={() => onSelect(variant)}>
                Вариант {variant}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default ListVariant;
  