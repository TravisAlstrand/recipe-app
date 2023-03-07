import { useEffect, useState } from "react";

const AllRecipes = () => {

  const { recipes, setRecipes } = useState([]);

  useEffect(() => {
  });

  return (
    <>
      <h1>All Recipes</h1>
      <p>{recipes}</p>
    </>
  );
};

export default AllRecipes;