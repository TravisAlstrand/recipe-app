import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const HomePage = () => {

  const { user } = useContext(UserContext);

  return (
    <main className='main-cont welcome'>
      <h1>RECIPE APP</h1>
      <p className='welcome-p'>A great place to save, edit and share your recipes without getting a god damn novel about what their great grandmothers were up to over a hundred years ago.</p>
      <Link to='/users/signin'>
        <button className='home-btn btn'>Sign In</button>
      </Link>
      <Link to='/users/signup'>
        <button className='home-btn btn'>Create an Account</button>
      </Link>
      <Link to='/recipes'>
        <button className='home-btn btn'>Browse Recipes</button>
      </Link>
    </main>
  );
};

export default HomePage;