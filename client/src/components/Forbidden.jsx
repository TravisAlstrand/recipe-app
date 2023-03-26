import { Link } from "react-router-dom";
import Header from "./Header";

const Forbidden = () => {
  return (
    <>
      <Header />
      <h1>Forbidden</h1>
      <Link to='/'>
        <button type='button'>Home</button>
      </Link>
    </>
  );
};

export default Forbidden;