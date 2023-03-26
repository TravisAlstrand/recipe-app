import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const HomePage = () => {

  const { user } = useContext(UserContext);

  return (
    <main>
      <div className='main-cont'>
        {
          user ? (
            <>
              <span className='user-name'>Welcome {user.username}!</span>
              <Link to='/users/signout'>
                <button className='home-btn'>Sign Out</button>
              </Link>
            </>
          ) :
            <>
              <Link to='/users/signin'>
                <button className='home-btn'>Sign In</button>
              </Link>
              <Link to='/users/signup'>
                <button className='home-btn'>Sign Up</button>
              </Link>
            </>
        }
        <Link to='/recipes'>
          <button className='home-btn'>Browse All Recipes</button>
        </Link>
      </div>
    </main>
  );
};

export default HomePage;