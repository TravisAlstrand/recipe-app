import { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { UserContext } from '../context/UserContext';
import { getSingleRecipe, updateRecipe } from "../utilities/ApiCalls";
import { cleanFormData, prepSelectData, prepIngSelectData, splitString, cleanIngredients } from "../utilities/DataClean";
import IngredientDiv from "./IngredientDiv";

const EditRecipe = () => {
  const { user } = useContext(UserContext);
  const [ingredients, setIngredients] = useState([]);
  const [directions, setDirections] = useState([]);
  const [recipe, setRecipe] = useState({});
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {

    async function getRecipe() {
      const res = await getSingleRecipe(params.id);
      if (res === 404) {
        navigate('/notfound')
      } else if (user !== null && user.id !== res.userId) {
        navigate('/forbidden');
      } else {
        console.log(res);
        setRecipe(res);

        updateIngDir(res);
        setIsLoading(false);
      };
    };

    getRecipe();
  }, []);

  function updateIngDir(recipe) {
    // Following code formats the response
    if (recipe.directions) {
      // converts directions from markdown into an array
      const dir = splitString(recipe.directions, 'directions');
      setDirections(dir);
    }
    if (recipe.ingredients) {
      // converts ingredients from markdown into an array
      const ing = splitString(recipe.ingredients, 'ingredients');
      setIngredients(ing);
    }
  }

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
      if (e.target.id.includes('item')) {
        values[index][2] = e.target.value;
      } else if (e.target.id.includes('Unit')) {
        values[index][1] = e.target.value;
      } else if (e.target.id.includes('Num')) {
        values[index][0] = e.target.value;
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
    body.id = recipe.id;
    console.log(body);
    updateRecipe(body, user.username, user.password)
      .then(res => {
        if (res.errors) {
          setErrors(res.errors);
        } else if (res.status === 403) {
          navigate('/forbidden');
        } else {
          navigate(`/recipes/${recipe.id}`);
        };
      });
  };

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
      {isLoading ? <h1>LOADING</h1> : <>
        <p>Created By: {recipe.recipeCreator?.username}</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor='name'>Recipe Name (Required)</label>
          <input type='text' name='name' id='name' defaultValue={recipe.recipeName} />
          <label htmlFor='type'>Type</label>
          <select name='type' id='type' defaultValue={recipe.type}>
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
          <select name='difficulty' id='difficulty' defaultValue={recipe.difficulty}>
            <option hidden>Select a Difficulty</option>
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
          <p>Slow Cooker?</p>
          <label htmlFor='yesSlow'>Yes</label>
          <input type='radio' name='slowCooker' id='yesSlow' defaultChecked={recipe.isSlowCooker === "TRUE"} />
          <label htmlFor='noSlow'>No</label>
          <input type='radio' name='slowCooker' id='noSlow' defaultChecked={recipe.isSlowCooker === "FALSE"} />
          <div className='all-ingredients-container' id='allIngredientsContainer'>
            {/* ========================================================================================================== */}
            <p>Ingredients</p>
            <button className='add-ingredient-btn' type='button' onClick={() => handleAdd('ingredient')}>+</button>
            {ingredients ? ingredients.map((data, index) => {
              return (
                <IngredientDiv key={index} index={index} data={data} handleChange={handleChange} handleDelete={handleDelete} />
              );
            }) : null}
            {/* ========================================================================================================== */}
          </div>
          <div className='all-directions-container'>
            <p>Directions</p>
            <button className='add-direction-btn' type='button' onClick={() => handleAdd('direction')}>+</button>
            {directions ? directions.map((data, index) => {
              return (
                <div className='direction-container' key={index}>
                  <input type='text' name='direction' value={data} onChange={e => handleChange(e, index, 'direction')} />
                  <button className='remove-direction-btn' type='button' onClick={() => handleDelete(index, 'direction')}>X</button>
                </div>
              );
            }) : null}
          </div>
          <label htmlFor='prepTime'>Prep Time</label>
          <input type='text' name='prepTime' id='prepTime' defaultValue={splitString(recipe.prepTime, 'prep/cook')[0]} />
          <select id='prepTimeUnit' name='prepTimeUnit' defaultValue={splitString(recipe.prepTime, 'prep/cook')[1]}>
            <option hidden>Select a Time Unit</option>
            <option>Minutes</option>
            <option>Hours</option>
          </select>
          <label htmlFor='cookTime'>Cook Time</label>
          <input type='text' name='cookTime' id='cookTime' defaultValue={splitString(recipe.cookTime, 'prep/cook')[0]} />
          <select id='cookTimeUnit' name='cookTimeUnit' defaultValue={splitString(recipe.cookTime, 'prep/cook')[1]}>
            <option hidden>Select a Time Unit</option>
            <option>Minutes</option>
            <option>Hours</option>
          </select>
          <button type='submit'>Submit</button>
          <Link to={`/recipes/${recipe.id}`}>
            <button>Cancel</button>
          </Link>
        </form>
      </>}
    </>
  );
};

export default EditRecipe;