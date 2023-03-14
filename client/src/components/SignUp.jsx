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
    <>
      <h1>Sign Up</h1>
      {errors.length > 0 ? (
        <div>
          <h3>Validation Errors</h3>
          <ul>
            {errors.map((error, index) => {
              return (<li key={index}>{error}</li>)
            })}
          </ul>
        </div>
      ) : (
        <></>
      )}
      <form onSubmit={handleSubmit}>
        <label htmlFor='username'>Username</label>
        <input id='username' name='username' type='text' ref={usernameInput} />
        <label htmlFor='password'>Password</label>
        <input id='password' name='password' type='password' ref={passwordInput} />
        <button type='submit'>Sign Up</button>
        <Link to='/'>
          <button>Cancel</button>
        </Link>
      </form>
    </>
  );
};

export default SignUp;