import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { getSingleRecipe } from '../utilities/ApiCalls';
import { hypToSpace } from '../utilities/DataClean';
import { UserContext } from '../context/UserContext';
import Header from './Header';

const RecipeDetail = () => {

  const { user } = useContext(UserContext);
  const [recipe, setRecipe] = useState({});
  const [ingredients, setIngredients] = useState('');
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
            cleanHyphens(res);
          };
        });
    };

    getRecipe();
  }, []);

  function cleanHyphens(res) {
    if (res.ingredients) {
      const newIngredients = hypToSpace(res.ingredients);
      setIngredients(newIngredients);
    };
  };

  function toggleActive(e) {
    const acc = e.target.parentNode.parentNode;
    acc.classList.toggle('active');

    if (acc.classList.contains('active')) {
      e.target.textContent = 'Hide';
    } else {
      e.target.textContent = 'Show';
    };
  };

  return (
    <>
      <Header />
      <main className='main-cont details'>
        {
          recipe ? (
            <>
              <h1>{recipe.recipeName}</h1>
              <div className='details-cont'>
                <p><span className='detail-name'>Created By: </span><span className='user-name'>{recipe.recipeCreator?.username}</span></p>
                <p><span className='detail-name'>Difficulty: </span>{recipe.difficulty}</p>
                <p><span className='detail-name'>Type: </span>{recipe.type}</p>
                <p><span className='detail-name'>Slow Cooker: </span>{recipe.isSlowCooker === 'TRUE' ? 'Yes' : (
                  recipe.isSlowCooker === 'FALSE' ? 'No' : ''
                )}
                </p>
                <div className='accordion-cont'>
                  <div className='accordion'>
                    <div className="accordion-header">
                      <p className='detail-name acc-header'>Ingredients:</p>
                      <button type='button' className='accordion-btn btn' onClick={e => toggleActive(e)}>Show</button>
                    </div>
                    <div className="accordion-body">
                      <ReactMarkdown className='mrkdn-ing-list'>{ingredients}</ReactMarkdown>
                    </div>
                  </div>
                </div>
                <div className='accordion'>
                  <div className="accordion-header">
                    <p className='detail-name acc-header'>Directions:</p>
                    <button type='button' className='accordion-btn btn' onClick={e => toggleActive(e)}>Show</button>
                  </div>
                  <div className="accordion-body">
                    <ReactMarkdown className='mrkdn-dir-list'>{recipe.directions}</ReactMarkdown>
                  </div>
                </div>
                <p><span className='detail-name'>Prep Time: </span>{recipe.prepTime}</p>
                <p><span className='detail-name'>Cook Time: </span>{recipe.cookTime}</p>
              </div>
            </>
          ) : (
            <h1>Loading...</h1>
          )}
        <div className='detail-btn-div'>
          <Link to={'/recipes'}>
            <button type='button' className='btn'>Back to Recipes</button>
          </Link>
          {user !== null && user.id === recipe.userId ? (
            <Link to={`/recipes/${recipe.id}/edit`}>
              <button type='button' className='btn'>Edit Recipe</button>
            </Link>) : <></>
          }
          {/* <Link to={`/recipes/${recipe.id}/edit`}>
            <button type='button' className='btn'>Delete Recipe</button>
          </Link> */}
        </div>
      </main>
    </>
  );
};

export default RecipeDetail;