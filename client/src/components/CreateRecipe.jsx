import { useRef } from "react";

const CreateRecipe = () => {

  const recipeName = useRef('');

  function handleSubmit(e) {
    e.preventDefault();
    console.log('submitted');
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
          <button class='add-ingredient-btn'>+</button>
          <div class='ingredient-container'>
            <input type='text' name='ingredient'></input>
            <button class='remove-ingredient-btn'>X</button>
          </div>
        </div>
        <div className='all-ingredients-container'>
          <p>Directions</p>
          <button class='add-direction-btn'>+</button>
          <div class='direction-container'>
            <input type='text' name='direction'></input>
            <button class='remove-direction-btn'>X</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateRecipe;