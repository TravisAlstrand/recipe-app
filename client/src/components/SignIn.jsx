import { useRef, useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const SignIn = () => {

  const { actions } = useContext(UserContext)
  const navigate = useNavigate();
  const location = useLocation();
  const usernameInput = useRef('');
  const passwordInput = useRef('');
  const [error, setError] = useState('');


  async function handleSubmit(e) {
    e.preventDefault();
    const username = usernameInput.current.value;
    const password = passwordInput.current.value;
    const response = await actions.signIn(username, password);
    if (response === undefined) {
      if (location.state?.from) {
        navigate(location.state.from);
      } else {
        navigate('/');
      };
    } else {
      setError(response);
    };
  };

  return (
    <>
      <h1>Sign In</h1>
      {error.length ? (
        <div>
          <h3>Validation Error</h3>
          <p>{error}</p>
        </div>
      ) : (
        <></>
      )}
      <form onSubmit={handleSubmit}>
        <label htmlFor='username'>Username</label>
        <input id='username' name='username' type='text' ref={usernameInput} />
        <label htmlFor='password'>Password</label>
        <input id='password' name='password' type='password' ref={passwordInput} />
        <button type='submit'>Sign In</button>
        <Link to='/'>
          <button>Cancel</button>
        </Link>
      </form>
      <p>Don't have an account yet?</p>
      <Link to='/users/signup'>
        <button>Sign Up</button>
      </Link>
    </>
  );
};

export default SignIn;