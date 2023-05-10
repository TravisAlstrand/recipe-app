import { useEffect, useState, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { UserContext } from '../context/UserContext';
import { getSingleRecipe, deleteRecipe } from '../utilities/ApiCalls';

const ConfirmDelete = () => {

  const { user } = useContext(UserContext);
  const [recipe, setRecipe] = useState({});
  const params = useParams();
  const navigate = useNavigate();

  function attemptDelete() {
    deleteRecipe(params.id, user.username, user.password)
      .then(res => {
        if (res === 404) {
          navigate('/notfound')
        } else if (res === 403) {
          navigate('/forbidden')
        } else {
          navigate('/recipes')
        };
      });
  };

  useEffect(() => {
    async function getRecipe() {
      await getSingleRecipe(params.id)
        .then(res => {
          if (res === 404) {
            navigate('/notfound')
          } else if (user !== null && user.id !== res.userId) {
            navigate('/forbidden');
          } else {
            setRecipe(res);
          };
        });
    };

    getRecipe();
  }, []);

  return (
    <>
      <h1>Confirm Delete</h1>
      <p>Are you certain you want to delete the recipe "{recipe.recipeName}"?!</p>
      <Link to={`/recipes/${recipe.id}`}>
        <button type='button' className="btn">Cancel</button>
      </Link>
      <Link to={'/recipes'}>
        <button type='button' onClick={attemptDelete} className='btn cancel-btn remove'>Delete Forever</button>
      </Link>
    </>
  );
};

export default ConfirmDelete;