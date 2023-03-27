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
              <span className='welcome-line-hdr'>Welcome <span className='user-name'>{user.username}</span>!</span>
              <NavLink className='nav-btn btn' to='/users/signout'>Sign Out</NavLink>
            </>
          ) :
            <>
              <NavLink className='nav-btn btn' to='/users/signin'>Sign In</NavLink>
              <NavLink className='nav-btn btn' to='/users/signup'>Sign Up</NavLink>
            </>
        }
      </nav>
    </header>
  );
};

export default Header;