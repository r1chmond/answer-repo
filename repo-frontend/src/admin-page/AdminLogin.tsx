import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

// interface LoginData {
//   email: string;
//   password: string;
// }
const BASE_URL = "http://127.0.0.1:8000/api/";
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    Authorization: localStorage.getItem("access_token")
      ? `JWT ${localStorage.getItem("access_token")}`
      : null,
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [event.target.name]: (event.target.value as string).trim(),
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    axiosInstance
      .post(
        `token/`,
        JSON.stringify({ email: loginData.email, password: loginData.password })
      )
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("access_token", response.data.access);
        localStorage.setItem("refresh_token", response.data.refresh);
        axiosInstance.defaults.headers[
          "Authorization"
        ] = `JWT ${localStorage.getItem("access_token")}`;
        navigate("/answer-repo/admin/dashboard");
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
      <form className="container-sm" onSubmit={handleSubmit}>
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
              onChange={handleChange}
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
              onChange={handleChange}
            />
          </div>
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
