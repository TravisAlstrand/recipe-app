import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <main className="main-cont">
      <h1>Page Not Found</h1>
      <p className="info-p">Sorry, we couldn't find that page or recipe!</p>
      <Link to='/'>
        <button type='button' className="btn">Home</button>
      </Link>
    </main>
  );
};

export default PageNotFound;