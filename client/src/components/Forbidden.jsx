import { Link } from "react-router-dom";

const Forbidden = () => {
  return (
    <>
      <h1>Forbidden</h1>
      <Link to='/'>
        <button type='button'>Home</button>
      </Link>
    </>
  );
};

export default Forbidden;