import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { getAllRecipes } from "../utilities/ApiCalls";

const AllRecipes = () => {

  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    async function getRecipes() {
      await getAllRecipes()
        .then(res => setRecipes(res))
    };
    getRecipes();
  }, []);

  return (
    <>
      <main className='main-cont'>
        <h1>Browse Recipes</h1>
        <ul className='recipes-cont'>
          {recipes.length && recipes?.map((recipe) => {
            return (
              <li className='recipe-li' key={recipe.id}>
                <Link to={`/recipes/${recipe.id}`}>
                  {recipe.recipeName}
                </Link>
              </li>
            );
          })}
        </ul>
        <Link to={'/recipes/create'}>
          <button type='button' className='home-btn btn'>Create New Recipe</button>
        </Link>
      </main>
    </>
  );
};

export default AllRecipes;