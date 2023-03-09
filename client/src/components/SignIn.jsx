import { useRef } from "react";
import { Link } from "react-router-dom";

const SignIn = () => {

  const usernameInput = useRef('');
  const passwordInput = useRef('');

  function handleSubmit(e) {
    e.preventDefault();
    console.log(usernameInput.current.value);
    console.log(passwordInput.current.value)
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