import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { getAllRecipes, getSortedRecipes } from "../utilities/ApiCalls";

const AllRecipes = () => {

  const [allRecipes, setAllRecipes] = useState([]);
  const [sortedRecipes, setSortedRecipes] = useState([]);
  const [sortBy, setSortBy] = useState("All");

  useEffect(() => {
    async function getRecipes() {
      if (sortBy === "All") {
        await getAllRecipes()
          .then(res => setAllRecipes(res))
      } else {
        const sortArray = sortBy.split(": ");
        console.log(sortArray);
      };
    };
    getRecipes();
  }, [sortBy]);

  function sortRecipes(e) {
    setSortBy(e.target.value);
  };

  return (
    <>
      <main className='main-cont'>
        <h1>Browse Recipes</h1>
        <div className='sort-div'>
          <label htmlFor='sortBy' className='sort-by-label'>Sort By:</label>
          <select name='sortBy' id='sortBy' onChange={sortRecipes}>
            <option>All</option>
            <optgroup label='Difficulty'>
              <option>Difficulty: Easy</option>
              <option>Difficulty: Medium</option>
              <option>Difficulty: Hard</option>
            </optgroup>
            <optgroup label='Cuisine'>
              <option>Cuisine: Mexican</option>
              <option>Cuisine: Asian</option>
              <option>Cuisine: Italian</option>
              <option>Cuisine: Indian</option>
              <option>Cuisine: American</option>
              <option>Cuisine: Breakfast</option>
              <option>Cuisine: Other</option>
            </optgroup>
            <optgroup label='Slow Cooker'>
              <option>Slow Cooker: Yes</option>
              <option>Slow Cooker: No</option>
            </optgroup>
          </select>
        </div>
        <ul className='recipes-cont'>
          {allRecipes.length && allRecipes?.map((recipe) => {
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