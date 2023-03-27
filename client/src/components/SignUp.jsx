import { useRef, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { createUser } from "../utilities/ApiCalls";

const SignUp = () => {

  const { actions } = useContext(UserContext);
  const [errors, setErrors] = useState([]);
  const usernameInput = useRef('');
  const passwordInput = useRef('');
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const username = usernameInput.current.value;
    const password = passwordInput.current.value;

    const body = {
      username,
      password
    };

    createUser(body)
      .then(res => {
        if (res.errors) {
          setErrors(res.errors);
        } else {
          actions.signIn(username, password);
          navigate('/');
        };
      });
  };

  return (
    <main className='main-cont'>
      <h1>Create an Account</h1>
      {errors.length > 0 ? (
        <div className='validation-div'>
          <h3 className='validation-h3'>Validation Errors</h3>
          <ul>
            {errors.map((error, index) => {
              return (<li key={index} className='validation-err'>{error}</li>)
            })}
          </ul>
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
          <button type='submit' className='submit-btn btn'>Sign Up</button>
          <Link to='/'>
            <button className='cancel-btn btn'>Cancel</button>
          </Link>
        </div>
      </form>
      <div className='change-div'>
        <p>Already have an account?</p>
        <Link to='/users/signin'>
          <button className='change-btn btn'>Sign In</button>
        </Link>
      </div>
    </main>
  );
};

export default SignUp;