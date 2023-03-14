import { useRef } from 'react';
import { Link } from 'react-router-dom';

const CreateRecipe = () => {

  const recipeName = useRef('');

  function handleSubmit(e) {
    e.preventDefault();
    console.log('submitted');
    console.log(recipeName.current.value);
  };

  return (
    <>
      <h1>Create Recipe</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='name'>Recipe Name (Required)</label>
        <input type='text' name='name' id='name' ref={recipeName} />
        <label htmlFor='difficulty'>Difficulty</label>
        <select name='difficulty' id='difficulty'>
          <option hidden>Select a Difficulty</option>
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>
        <label htmlFor='ethnicity'>Ethnic Type</label>
        <select name='ethnicity' id='ethnicity'>
          <option hidden>Select an Ethnic Type</option>
          <option>Mexican</option>
          <option>Asian</option>
          <option>Italian</option>
          <option>Indian</option>
          <option>American</option>
          <option>Breakfast</option>
          <option>Other</option>
        </select>
        <p>Slow Cooker?</p>
        <label htmlFor='yesSlow'>Yes</label>
        <input type='radio' name='slowCooker' id='yesSlow' />
        <label htmlFor='noSlow'>No</label>
        <input type='radio' name='slowCooker' id='noSlow' />
        <div className='all-ingredients-container'>
          <p>Ingredients</p>
          <button className='add-ingredient-btn'>+</button>
          <div className='ingredient-container'>
            <input type='text' name='ingredient'></input>
            <button className='remove-ingredient-btn'>X</button>
          </div>
        </div>
        <div className='all-ingredients-container'>
          <p>Directions</p>
          <button className='add-direction-btn'>+</button>
          <div className='direction-container'>
            <input type='text' name='direction'></input>
            <button className='remove-direction-btn'>X</button>
          </div>
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