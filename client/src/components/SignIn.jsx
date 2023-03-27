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
    <main className='main-cont'>
      <h1>SIGN IN</h1>
      {error.length ? (
        <div className='validation-div'>
          <h3 className='validation-h3'>Validation Error</h3>
          <p className='validation-err'>{error}</p>
        </div>
      ) : (
        <></>
      )}
      <form onSubmit={handleSubmit}>
        <div className='input-div'>
          <label htmlFor='username'>Username</label>
          <input id='username' name='username' type='text' ref={usernameInput} required />
        </div>
        <div className='input-div'>
          <label htmlFor='password'>Password</label>
          <input id='password' name='password' type='password' ref={passwordInput} required />
        </div>
        <div className='signin-btn-div'>
          <button type='submit' className='submit-btn btn'>Sign In</button>
          <Link to='/'>
            <button className='cancel-btn btn'>Cancel</button>
          </Link>
        </div>
      </form>
      <div className='change-div'>
        <p>Don't have an account yet?</p>
        <Link to='/users/signup'>
          <button className='change-btn btn'>Sign Up</button>
        </Link>
      </div>
    </main>
  );
};

export default SignIn;