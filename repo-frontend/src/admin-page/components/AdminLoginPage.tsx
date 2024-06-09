import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar";
import { useAuth } from "../AuthContext";
import { useState } from "react";
const AdminLoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  let location = useLocation();
  let params = new URLSearchParams(location.search);
  let from = params.get("from") || "/answer-repo/admin/dashboard";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    setIsLoggingIn(true);
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Failed to login:", error);
      setError("Invalid login attempt");
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <>
      <nav className="navbar navbar-dark bg-dark">
        <NavBar />
      </nav>
      <form onSubmit={handleSubmit} className="container-sm">
        <h2>Login</h2>
        <div className="mb-3 row">
          <label
            htmlFor="exampleFormControlInput1"
            className="col-sm-2 col-form-label"
          >
            Email:
          </label>
          <div className="col-sm-10">
            <input
              className="form-control"
              id="exampleFormControlInput1"
              type="email"
              name="email"
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="inputPassword" className="col-sm-2 col-form-label">
            Password:
          </label>
          <div className="col-sm-10">
            <input
              id="inputPassword"
              className="form-control"
              type="password"
              name="password"
            />
          </div>
        </div>
        <br />
        <button
          className="btn error-page-btn"
          type="submit"
          disabled={isLoggingIn}
        >
          {isLoggingIn ? "Logging in..." : "Login"}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </>
  );
};

export default AdminLoginPage;
