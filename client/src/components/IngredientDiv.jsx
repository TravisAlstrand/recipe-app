const IngredientDiv = ({ index, handleChange, handleDelete }) => {
  return (
    <div className='ingredient-container' key={index}>
      <label htmlFor={`amountNum${index}`}>Amount</label>
      <input type='text' name='ingredient' id={`amountNum${index}`} onChange={e => handleChange(e, index, 'ingredient')} />
      <label htmlFor={`amountUnit${index}`}>Unit</label>
      <select name={`amountUnit${index}`} id={`amountUnit${index}`} onChange={e => handleChange(e, index, 'ingredient')}>
        <option hidden>Choose a Unit</option>
        <optgroup label='Weight'>
          <option>Gram</option>
          <option>Ounce</option>
          <option>Pound</option>
        </optgroup>
        <optgroup label='Volume'>
          <option>Teaspoon</option>
          <option>Tablespoon</option>
          <option>Fluid Ounce</option>
          <option>Cup</option>
          <option>Pint</option>
          <option>Quart</option>
          <option>Gallon</option>
        </optgroup>
        <optgroup label='Misc'>
          <option>Each</option>
          <option>Bunch</option>
          <option>Dollop</option>
          <option>Splash</option>
          <option>Pinch</option>
        </optgroup>
      </select>
      <label htmlFor={`item${index}`}>Item</label>
      <input type='text' name={`item${index}`} id={`item${index}`} onChange={e => handleChange(e, index, 'ingredient')} />
      <button className='remove-ingredient-btn' type='button' onClick={() => handleDelete(index, 'ingredient')}>X</button>
    </div>
  );
};

export default IngredientDiv;