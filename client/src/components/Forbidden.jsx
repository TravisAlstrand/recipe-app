import { Link } from "react-router-dom";

const Forbidden = () => {
  return (
    <main className="main-cont">
      <h1>Forbidden</h1>
      <p className="info-p">You do not have access to that.</p>
      <Link to='/'>
        <button type='button' className='btn'>Home</button>
      </Link>
    </main>
  );
};

export default Forbidden;