import { Link } from "react-router-dom";
import ar_logo from "../assets/ar_logo.png";

const NavBar = () => {
  return (
    <div className="container-fluid">
      <Link id="logo-container" className="navbar-brand" to="/">
        <img id="logo" src={ar_logo} alt="logo" />
      </Link>
      <ul className="navbar-nav me-auto mb-2">
        <li className="text-light ">
          <Link id="home-label" to={`/`}>
            Answer Repo
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
