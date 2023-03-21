import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { getSingleRecipe } from '../utilities/ApiCalls';
import { UserContext } from '../context/UserContext';

const RecipeDetail = () => {

  const { user } = useContext(UserContext);
  const [recipe, setRecipe] = useState({});
  const params = useParams();
  const navigate = useNavigate();

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
    };

    getRecipe();
  }, []);

  return (
    <>
      {
        recipe ? (
          <>
            <h1>{recipe.recipeName}</h1>
            <p>Created By: {recipe.recipeCreator?.username}</p>
            <p>Difficulty: {recipe.difficulty}</p>
            <p>Type: {recipe.type}</p>
            <p>Slow Cooker: {recipe.isSlowCooker === 'TRUE' ? 'Yes' : (
              recipe.isSlowCooker === 'FALSE' ? 'No' : ''
            )}
            </p>
            <p>Ingredients:</p>
            <ReactMarkdown>{recipe.ingredients}</ReactMarkdown>
            <p>Directions:</p>
            <ReactMarkdown>{recipe.directions}</ReactMarkdown>
            <p>Prep Time: {recipe.prepTime}</p>
            <p>Cook Time: {recipe.cookTime}</p>
          </>
        ) : (
          <h1>Loading...</h1>
        )}
      <Link to={'/'}>
        <button type='button'>Home</button>
      </Link>
      {user !== null && user.id === recipe.userId ? (
        <Link to={`/recipes/${recipe.id}/edit`}>
          <button type='button'>Edit</button>
        </Link>) : <></>
      }
    </>
  );
};

export default RecipeDetail;