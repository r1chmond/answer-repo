import { Link } from "react-router-dom";
import ar_logo from "../../assets/ar_logo.png";
import { useAuth } from "../AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";

const AdminNavBar: React.FC = () => {
  const { logout } = useAuth();

  // const [currentUser, setCurrentUser] = useState("");

  // useEffect(() => {
  //   const fetctCurrentUser = async () => {
  //     try {
  //       const userResponse = await axios.get(`http://127.0.0.1:8000/api/user/`);
  //       setCurrentUser(userResponse.data("email"));
  //     } catch (err) {
  //       console.error(`failed to get current user ${err}`);
  //     }
  //   };
  //   fetctCurrentUser();
  // });

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
        to="/answer-repo/admin/dashboard/"
      >
        <img id="logo" src={ar_logo} alt="logo" />
      </Link>
      <ul className="navbar-nav me-auto mb-2">
        <li className="text-light ">
          <Link id="home-label" to={`/answer-repo/admin/dashboard/`}>
            Answer Repo
          </Link>
        </li>
      </ul>
      <div className="flex-d">
        <div id="current-user">{`currentUser`}</div>
        <button className="btn error-page-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminNavBar;
