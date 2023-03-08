import { useEffect, useState } from "react";
import { getAllRecipes } from "../ApiCalls";

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
      <h1>All Recipes</h1>
      {recipes?.map((recipe) => {
        return (<p key={recipe.id}>{recipe.recipeName}</p>);
      })}
    </>
  );
};

export default AllRecipes;