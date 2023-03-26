import { Link } from "react-router-dom";
import Header from "./Header";

const PageNotFound = () => {
  return (
    <>
      <Header />
      <h1>Page Not Found</h1>
      <Link to='/'>
        <button type='button'>Home</button>
      </Link>
    </>
  );
};

export default PageNotFound;