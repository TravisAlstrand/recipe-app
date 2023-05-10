import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { createRecipe } from '../utilities/ApiCalls';
import { cleanFormData, cleanIngredients } from '../utilities/DataClean';
import IngredientDiv from './IngredientDiv';

const CreateRecipe = () => {

  const { user } = useContext(UserContext);
  const [ingredients, setIngredients] = useState([]);
  const [directions, setDirections] = useState([]);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

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
      if (e.target.id === `amountNum${index}`) {
        values[index][0] = e.target.value;
      } else if (e.target.id === `amountUnit${index}`) {
        values[index][1] = e.target.value;
      } else if (e.target.id === `item${index}`) {
        values[index][2] = e.target.value;
      };
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
    // trim whitespace / replace spaces with hyphens
    const trimmedIngredients = cleanIngredients(ingredients);
    setIngredients(trimmedIngredients);
    // compile body for request
    let body = cleanFormData(e.target, ingredients, directions);
    body.userId = user.id;
    createRecipe(body, user.username, user.password)
      .then(res => {
        if (res.errors) {
          setErrors(res.errors);
        } else {
          navigate('/recipes');
        };
      });
  };

  return (
    <main className='main-cont highest'>
      <h1>Create Recipe</h1>
      {errors.length > 0 ? (
        <div className='validation-div'>
          <h3 className='validation-h3'>Validation Errors</h3>
          <ul>
            {errors.map((error, index) => {
              return (<li key={index} className='validation-err'>{error}</li>)
            })}
          </ul>
        </div>
      ) : (
        <></>
      )}
      <form className='create-edit-form' onSubmit={handleSubmit}>
        <div className='label-input-div'>
          <label htmlFor='name'>Recipe Name <span className='validation-err'>(Required)</span></label>
          <input type='text' name='name' id='name' placeholder='ex. Bestest Recipe Evers' />
        </div>
        <div className='label-input-div'>
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
        </div>
        <div className='label-input-div'>
          <label htmlFor='difficulty'>Difficulty</label>
          <select name='difficulty' id='difficulty'>
            <option hidden>Select a Difficulty</option>
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
        </div>
        <p>Slow Cooker?</p>
        <div className='label-radio-div'>
          <label htmlFor='yesSlow'>Yes</label>
          <input type='radio' name='slowCooker' id='yesSlow' />
          <label htmlFor='noSlow'>No</label>
          <input type='radio' name='slowCooker' id='noSlow' />
        </div>
        <div className='all-ingredients-cont' id='allIngredientsContainer'>
          <div className='label-input-div no-bottom-border'>
            <p>Ingredients</p>
          </div>
          {ingredients.map((data, index) => {
            return (
              <IngredientDiv key={index} index={index} data={data} handleChange={handleChange} handleDelete={handleDelete} />
            );
          })}
          <div className='add-div'>
            <button className='btn' type='button' onClick={() => handleAdd('ingredient')}>Add Ingredient</button>
          </div>
        </div>
        <div className='all-directions-cont'>
          <div className='label-input-div no-bottom-border'>
            <p>Directions</p>
          </div>
          {directions.map((data, index) => {
            return (
              <div className='ing-dir-cont' key={index}>
                <input type='text' name='direction' value={data} onChange={e => handleChange(e, index, 'direction')} placeholder='ex. Cook until it reaches temp' />
                <button className='cancel-btn remove btn' type='button' onClick={() => handleDelete(index, 'direction')}>Remove Above Direction</button>
              </div>
            );
          })}
          <div className='add-div'>
            <button className='btn' type='button' onClick={() => handleAdd('direction')}>Add Direction Step</button>
          </div>
        </div>
        <div className='label-input-div'>
          <label htmlFor='prepTime'>Prep Time</label>
          <div className='input-select-div'>
            <input type='text' name='prepTime' id='prepTime' placeholder='ex. 1.5' />
            <select id='prepTimeUnit' name='prepTimeUnit'>
              <option hidden>Select a Time Unit</option>
              <option>Minutes</option>
              <option>Hours</option>
            </select>
          </div>
        </div>
        <div className='label-input-div'>
          <label htmlFor='cookTime'>Cook Time</label>
          <div className='input-select-div'>
            <input type='text' name='cookTime' id='cookTime' placeholder='ex. 1.5' />
            <select id='cookTimeUnit' name='cookTimeUnit'>
              <option hidden>Select a Time Unit</option>
              <option>Minutes</option>
              <option>Hours</option>
            </select>
          </div>
        </div>
        <button type='submit' className='submit-btn btn'>Submit</button>
        <Link to='/recipes'>
          <button className='cancel-btn btn'>Cancel</button>
        </Link>
      </form>
    </main>
  );
};

export default CreateRecipe;