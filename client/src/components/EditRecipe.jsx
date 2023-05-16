import { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { UserContext } from '../context/UserContext';
import { getSingleRecipe, updateRecipe } from "../utilities/ApiCalls";
import { cleanFormData, splitString, cleanIngredients } from "../utilities/DataClean";
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
    };
    if (recipe.ingredients) {
      // converts ingredients from markdown into an array
      const ing = splitString(recipe.ingredients, 'ingredients');
      setIngredients(ing);
    };
  };

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
    <main className='main-cont highest'>
      <h1>Edit Recipe</h1>

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
      {isLoading ? <h1>LOADING</h1> : <>
        <p><span className='detail-name'>Created By:</span> <span className='user-name'>{recipe.recipeCreator?.username}</span></p>
        <form className='create-edit-form' onSubmit={handleSubmit}>
          <div className='label-input-div'>
            <label htmlFor='name'>Recipe Name (Required)</label>
            <input type='text' name='name' id='name' defaultValue={recipe.recipeName} />
          </div>
          <div className='label-input-div'>
            <label htmlFor='type'>Cuisine</label>
            <select name='type' id='type' defaultValue={recipe.cuisine}>
              <option hidden>Select a Cuisine</option>
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
            <select name='difficulty' id='difficulty' defaultValue={recipe.difficulty}>
              <option hidden>Select a Difficulty</option>
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </div>
          <p>Slow Cooker?</p>
          <div className='label-radio-div'>
            <label htmlFor='yesSlow'>Yes</label>
            <input type='radio' name='slowCooker' id='yesSlow' defaultChecked={recipe.isSlowCooker === "TRUE"} />
            <label htmlFor='noSlow'>No</label>
            <input type='radio' name='slowCooker' id='noSlow' defaultChecked={recipe.isSlowCooker === "FALSE"} />
          </div>
          <div className='all-ingredients-cont' id='allIngredientsContainer'>
            <div className='label-input-div no-bottom-border'>
              <p>Ingredients</p>
            </div>
            {ingredients ? ingredients.map((data, index) => {
              return (
                <IngredientDiv key={index} index={index} data={data} handleChange={handleChange} handleDelete={handleDelete} />
              );
            }) : null}
            <div className="add-div">
              <button className='btn' type='button' onClick={() => handleAdd('ingredient')}>Add Ingredient</button>
            </div>
          </div>
          <div className='all-directions-cont'>
            <div className='label-input-div no-bottom-border'>
              <p>Directions</p>
            </div>
            {directions ? directions.map((data, index) => {
              return (
                <div className='ing-dir-cont' key={index}>
                  <input type='text' name='direction' value={data} onChange={e => handleChange(e, index, 'direction')} />
                  <button className='cancel-btn remove btn' type='button' onClick={() => handleDelete(index, 'direction')}>Remove Above Direction</button>
                </div>
              );
            }) : null}
            <div className="add-div">
              <button className='btn' type='button' onClick={() => handleAdd('direction')}>Add Direction Step</button>
            </div>
          </div>
          <div className='label-input-div'>
            <label htmlFor='prepTime'>Prep Time</label>
            <div className='input-select-div'>
              <input type='text' name='prepTime' id='prepTime' defaultValue={splitString(recipe.prepTime, 'prep/cook')[0]} />
              <select id='prepTimeUnit' name='prepTimeUnit' defaultValue={splitString(recipe.prepTime, 'prep/cook')[1]}>
                <option hidden>Select a Time Unit</option>
                <option>Minutes</option>
                <option>Hours</option>
              </select>
            </div>
          </div>
          <div className='label-input-div'>
            <label htmlFor='cookTime'>Cook Time</label>
            <div className='input-select-div'>
              <input type='text' name='cookTime' id='cookTime' defaultValue={splitString(recipe.cookTime, 'prep/cook')[0]} />
              <select id='cookTimeUnit' name='cookTimeUnit' defaultValue={splitString(recipe.cookTime, 'prep/cook')[1]}>
                <option hidden>Select a Time Unit</option>
                <option>Minutes</option>
                <option>Hours</option>
              </select>
            </div>
          </div>
          <button type='submit' className='submit-btn btn'>Submit</button>
          <Link to={`/recipes/${recipe.id}`}>
            <button className='cancel-btn btn'>Cancel</button>
          </Link>
        </form>
      </>}
    </main>
  );
};

export default EditRecipe;