import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { getAllRecipes } from "../utilities/ApiCalls";

import Header from './Header';

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
      <Header />
      <h1>All Recipes</h1>
      {recipes?.map((recipe) => {
        return (
          <Link key={recipe.id} to={`/recipes/${recipe.id}`}>
            <p>{recipe.recipeName}</p>
          </Link>);
      })}
      <Link to={'/recipes/create'}>
        <p>Create New Recipe</p>
      </Link>
    </>
  );
};

export default AllRecipes;