import { useRef, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";

const SignIn = () => {

  const { actions } = useContext(UserContext)
  const usernameInput = useRef('');
  const passwordInput = useRef('');

  function handleSubmit(e) {
    e.preventDefault();
    const username = usernameInput.current.value;
    const password = passwordInput.current.value;
    actions.signIn(username, password);
  };

  return (
    <>
      <h1>Sign In</h1>
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
    </>
  );
};

export default SignIn;