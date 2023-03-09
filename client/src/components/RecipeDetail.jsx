import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { getSingleRecipe } from '../ApiCalls';

const RecipeDetail = () => {

  const [recipe, setRecipe] = useState({});
  const params = useParams();

  useEffect(() => {

    async function getRecipe() {
      await getSingleRecipe(params.id)
        .then(res => setRecipe(res));
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
            <p>Ethnic Type: {recipe.ethnicType}</p>
            <p>Slow Cooker: {recipe.isSlowCooker}</p>
            <p>Ingredients:</p>
            <ReactMarkdown>{recipe.ingredients}</ReactMarkdown>
            <p>Directions:</p>
            <ReactMarkdown>{recipe.directions}</ReactMarkdown>
          </>
        ) : (
          <h1>Recipe Details</h1>
        )}
    </>
  );
};

export default RecipeDetail;