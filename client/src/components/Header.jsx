import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Header = () => {

  const { user } = useContext(UserContext);

  return (
    <header>
      <nav>
        {
          user ? (
            <>
              <span className='user-name'>Welcome {user.username}!</span>
              <NavLink className='nav-btn' to='/users/signout'>Sign Out</NavLink>
            </>
          ) :
            <>
              <NavLink className='nav-btn' to='/users/signin'>Sign In</NavLink>
              <NavLink className='nav-btn' to='/users/signup'>Sign Up</NavLink>
            </>
        }
      </nav>
    </header>
  );
};

export default Header;