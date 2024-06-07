import { Link } from "react-router-dom";
import ar_logo from "../../assets/ar_logo.png";
import { useAuth } from "../AuthContext";

const AdminNavBar: React.FC = () => {
  const { logout } = useAuth();
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Failed to logout: ", error);
    }
  };
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
        <button className="btn error-page-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminNavBar;
