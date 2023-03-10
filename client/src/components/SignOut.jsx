import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const SignOut = () => {
  const { actions } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    actions.signOut();
    navigate('/');
  });

  return (
    <>
      <h2>Signing out...</h2>
    </>
  );
};

export default SignOut;