import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    axios
      .post(`http://127.0.0.1:8000/auth/login/`, { email, password })
      .then((response) => {
        console.log(response.data);
        navigate("/answer-repo/admin/feed/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <nav className="navbar navbar-dark bg-dark">
        <NavBar />
      </nav>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-fields-container">
          <label className="lbl-display">Email:</label>
          <input
            className="inp-display"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-fields-container">
          <label className="lbl-display">Password:</label>
          <input
            className="inp-display"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <br />
        <button className="btn error-page-btn" type="submit">
          Login
        </button>
      </form>
    </>
  );
};

export default AdminLogin;
