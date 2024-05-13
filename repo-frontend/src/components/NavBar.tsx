import { Link } from "react-router-dom";
import ar_logo from "../assets/ar_logo.png";

function NavBar() {
  return (
    <div className="container-fluid">
      <Link id="logo-container" className="navbar-brand" to="/">
        <img id="logo" src={ar_logo} alt="logo" />
      </Link>
    </div>
  );
}

export default NavBar;
