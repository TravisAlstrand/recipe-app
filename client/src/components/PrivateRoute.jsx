import { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const PrivateRoute = () => {

  const { user } = useContext(UserContext);
  const location = useLocation();

  return (
    user ?
      <Outlet /> :
      <Navigate to={'/users/signin'} replace state={{ from: location }} />
  );
};

export default PrivateRoute;