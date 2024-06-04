import { Link } from "react-router-dom";
import ar_logo from "../../assets/ar_logo.png";
import Logout from "../Logout";

const AdminNavBar: React.FC = () => {
  return (
    <div className="container-fluid">
      <Link
        id="logo-container"
        className="navbar-brand"
        to="/answer-repo/admin/feed/"
      >
        <img id="logo" src={ar_logo} alt="logo" />
      </Link>
      <ul className="navbar-nav me-auto mb-2">
        <li className="text-light ">
          <Link id="home-label" to={`/answer-repo/admin/feed/`}>
            Answer Repo
          </Link>
        </li>
      </ul>
      <div className="flex-d">
        <Logout />
      </div>
    </div>
  );
};

export default AdminNavBar;
