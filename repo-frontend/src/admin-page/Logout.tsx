// src/components/Logout.tsx
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Logout: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    axios
      .post("http://127.0.0.1:8000/auth/logout/")
      .then((response) => {
        console.log(response.data);
        // Optionally clear user state in context or Redux
        navigate("/answer-repo/admin/login");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
