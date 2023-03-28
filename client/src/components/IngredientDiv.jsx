const IngredientDiv = ({ index, data, handleChange, handleDelete }) => {
  return (
    <div className='ing-dir-cont' key={index}>
      <label htmlFor={`amountNum${index}`}>Amount</label>
      <div className='input-select-div'>
        <input type='text' name='ingredient' id={`amountNum${index}`} defaultValue={data[0]} onChange={e => handleChange(e, index, 'ingredient')} placeholder='ex. 1.5' />
        <select name={`amountUnit${index}`} id={`amountUnit${index}`} onChange={e => handleChange(e, index, 'ingredient')} defaultValue={data[1]}>
          <option hidden>Select a Unit</option>
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
      </div>
      <label htmlFor={`item${index}`}>Item</label>
      <input type='text' name={`item${index}`} id={`item${index}`} defaultValue={data[2]} onChange={e => handleChange(e, index, 'ingredient')} placeholder='ex. Swiss Cheese' />
      <button className='cancel-btn remove btn' type='button' onClick={() => handleDelete(index, 'ingredient')}>Remove Above Ingredient</button>
    </div>
  );
};

export default IngredientDiv;