import { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { UserContext } from '../context/UserContext';
import { getSingleRecipe } from "../utilities/ApiCalls";
import { cleanFormData, prepSelectData, splitString } from "../utilities/DataClean";

const EditRecipe = () => {
  const { user } = useContext(UserContext);
  const [ingredients, setIngredients] = useState([]);
  const [directions, setDirections] = useState([]);
  const [recipe, setRecipe] = useState({});
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
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
    console.log(body);
    // createRecipe(body, user.username, user.password)
    //   .then(res => {
    //     if (res.errors) {
    //       setErrors(res.errors);
    //     } else {
    //       navigate('/');
    //     };
    //   });
  };

  function fillForm() {
    // type
    const typeOptions = document.querySelector('#type').children;
    const typeToSelect = prepSelectData(typeOptions, recipe.type);
    typeOptions[typeToSelect].selected = true;
    // difficulty
    const diffOptions = document.querySelector('#difficulty').children;
    const diffToSelect = prepSelectData(diffOptions, recipe.difficulty);
    diffOptions[diffToSelect].selected = true;
    // isSlowCooker
    const yesRadio = document.querySelector('#yesSlow');
    const noRadio = document.querySelector('#noSlow');
    if (recipe.isSlowCooker === 'TRUE') {
      yesRadio.checked = true;
    } else if (recipe.isSlowCooker === 'FALSE') {
      noRadio.checked = true;
    };
    // ingredients 
    if (recipe.ingredients) {
      const splitIngredients = splitString(recipe.ingredients);
      setIngredients(splitIngredients);
    };
    // directions
    if (recipe.directions) {
      const splitDirections = splitString(recipe.directions);
      setDirections(splitDirections);
    };
    // prepTime
    if (recipe.prepTime) {
      const prepInput = document.querySelector('#prepTime');
      const splitPrep = splitString(recipe.prepTime);
      prepInput.defaultValue = splitPrep[0];
      const prepOptions = document.querySelector('#prepTimeUnit').children;
      const prepToSelect = prepSelectData(prepOptions, splitPrep[1]);
      prepOptions[prepToSelect].selected = true;
    };
    // cookTime
    if (recipe.cookTime) {
      const cookInput = document.querySelector('#cookTime');
      const splitCook = splitString(recipe.cookTime);
      cookInput.defaultValue = splitCook[0];
      const cookOptions = document.querySelector('#cookTimeUnit').children;
      const cookToSelect = prepSelectData(cookOptions, splitCook[1]);
      cookOptions[cookToSelect].selected = true;
    };
    setIsLoading(false);
  };

  useEffect(() => {

    async function getRecipe() {
      await getSingleRecipe(params.id)
        .then(res => {
          if (res === 404) {
            navigate('/notfound')
          } else {
            setRecipe(res);
          };
        });
      fillForm();
    };

    getRecipe();
  }, [isLoading]);

  return (
    <>
      <h1>Edit Recipe</h1>
      {errors.length > 0 ? (
        <div>
          <h3>Validation Errors</h3>
          <ul>
            {errors.map((error, index) => {
              return (<li key={index}>{error}</li>)
            })}
          </ul>
        </div>
      ) : (
        <></>
      )}
      <p>Created By: {recipe.recipeCreator?.username}</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor='name'>Recipe Name (Required)</label>
        <input type='text' name='name' id='name' defaultValue={recipe.recipeName} />
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
              <div className='ingredient-container' key={index}>
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
              <div className='direction-container' key={index}>
                <input type='text' name='direction' value={data} onChange={e => handleChange(e, index, 'direction')} />
                <button className='remove-direction-btn' type='button' onClick={() => handleDelete(index, 'direction')}>X</button>
              </div>
            );
          })}
        </div>
        <label htmlFor='prepTime'>Prep Time</label>
        <input type='text' name='prepTime' id='prepTime' />
        <select id='prepTimeUnit' name='prepTimeUnit'>
          <option hidden>Select a Time Unit</option>
          <option>Minutes</option>
          <option>Hours</option>
        </select>
        <label htmlFor='cookTime'>Cook Time</label>
        <input type='text' name='cookTime' id='cookTime' />
        <select id='cookTimeUnit' name='cookTimeUnit'>
          <option hidden>Select a Time Unit</option>
          <option>Minutes</option>
          <option>Hours</option>
        </select>
        <button type='submit'>Submit</button>
        <Link to={`/recipes/${recipe.id}`}>
          <button>Cancel</button>
        </Link>
      </form>
    </>
  );
};

export default EditRecipe;