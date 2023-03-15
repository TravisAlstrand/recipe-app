import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { createRecipe } from '../utilities/ApiCalls';
import { cleanFormData } from '../utilities/DataClean';

const CreateRecipe = () => {

  const { user } = useContext(UserContext);
  const [ingredients, setIngredients] = useState([]);
  const [directions, setDirections] = useState([]);

  function handleAdd(string) {
    let values;
    if (string === 'ingredient') {
      values = [...ingredients, []];
      setIngredients(values);
    } else if (string === 'direction') {
      values = [...directions, []];
      setDirections(values);
    };
  };

  function handleChange(e, index, string) {
    let values;
    if (string === 'ingredient') {
      values = [...ingredients];
      values[index] = e.target.value;
      setIngredients(values);
    } else if (string === 'direction') {
      values = [...directions];
      values[index] = e.target.value;
      setDirections(values);
    };
  };

  function handleDelete(index, string) {
    let values;
    if (string === 'ingredient') {
      values = [...ingredients];
      values.splice(index, 1);
      setIngredients(values);
    } else if (string === 'direction') {
      values = [...directions];
      values.splice(index, 1);
      setDirections(values);
    };
  };

  function handleSubmit(e) {
    e.preventDefault();
    let body = cleanFormData(e.target, ingredients, directions);
    body.userId = user.id;
    createRecipe(body, user.username, user.password);
  };

  return (
    <>
      <h1>Create Recipe</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='name'>Recipe Name (Required)</label>
        <input type='text' name='name' id='name' />
        <label htmlFor='type'>Type</label>
        <select name='type' id='type'>
          <option hidden>Select a Type</option>
          <option>Mexican</option>
          <option>Asian</option>
          <option>Italian</option>
          <option>Indian</option>
          <option>American</option>
          <option>Breakfast</option>
          <option>Other</option>
        </select>
        <label htmlFor='difficulty'>Difficulty</label>
        <select name='difficulty' id='difficulty'>
          <option hidden>Select a Difficulty</option>
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>
        <p>Slow Cooker?</p>
        <label htmlFor='yesSlow'>Yes</label>
        <input type='radio' name='slowCooker' id='yesSlow' />
        <label htmlFor='noSlow'>No</label>
        <input type='radio' name='slowCooker' id='noSlow' />
        <div className='all-ingredients-container' id='allIngredientsContainer'>
          <p>Ingredients</p>
          <button className='add-ingredient-btn' type='button' onClick={() => handleAdd('ingredient')}>+</button>
          {ingredients.map((data, index) => {
            return (
              <div className='ingredient-container' key={crypto.randomUUID()}>
                <input type='text' name='ingredient' value={data} onChange={e => handleChange(e, index, 'ingredient')} />
                <button className='remove-ingredient-btn' type='button' onClick={() => handleDelete(index, 'ingredient')}>X</button>
              </div>
            );
          })}
        </div>
        <div className='all-directions-container'>
          <p>Directions</p>
          <button className='add-direction-btn' type='button' onClick={() => handleAdd('direction')}>+</button>
          {directions.map((data, index) => {
            return (
              <div className='direction-container' key={crypto.randomUUID()}>
                <input type='text' name='direction' value={data} onChange={e => handleChange(e, index, 'direction')} />
                <button className='remove-direction-btn' type='button' onClick={() => handleDelete(index, 'direction')}>X</button>
              </div>
            );
          })}
        </div>
        <label htmlFor='prepTime'>Prep Time</label>
        <input type='text' name='prepTime' id='prepTime'></input>
        <select id='prepTimeUnit' name='prepTimeUnit'>
          <option hidden>Select a Time Unit</option>
          <option>Minutes</option>
          <option>Hours</option>
        </select>
        <label htmlFor='cookTime'>Cook Time</label>
        <input type='text' name='cookTime' id='cookTime'></input>
        <select id='cookTimeUnit' name='cookTimeUnit'>
          <option hidden>Select a Time Unit</option>
          <option>Minutes</option>
          <option>Hours</option>
        </select>
        <button type='submit'>Submit</button>
        <Link to='/'>
          <button>Cancel</button>
        </Link>
      </form>
    </>
  );
};

export default CreateRecipe;