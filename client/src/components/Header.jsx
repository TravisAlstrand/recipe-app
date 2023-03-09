import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <ul>
      <li><NavLink to='/users/signin'>Sign In</NavLink></li>
      <li><NavLink to='/users/signup'>Sign Up</NavLink></li>
    </ul>
  );
};

export default Header;