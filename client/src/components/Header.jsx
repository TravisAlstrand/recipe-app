import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Header = () => {

  const { user } = useContext(UserContext);

  return (
    <nav>
      {
        user ? (
          <>
            <NavLink to='/users/signout'>Sign Out</NavLink>
          </>
        ) :
          <>
            <NavLink to='/users/signin'>Sign In</NavLink>
            <NavLink to='/users/signup'>Sign Up</NavLink>
          </>
      }

    </nav>
  );
};

export default Header;