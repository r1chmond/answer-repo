// src/components/Logout.tsx
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const getCookie = (name: string): string | null => {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
};

const logout = async (): Promise<void> => {
  const refreshToken = localStorage.getItem("refresh_token");
  try {
    await axios.post(
      "http://127.0.0.1:8000/logout/blacklist/",
      { refresh_token: refreshToken },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCookie("csrftoken"),
        },
      }
    );
  } catch (err) {
    console.error("Error during logout:", err);
  }
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  axios.defaults.headers["Authorization"] = null;
};

const Logout: React.FC = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logout();
    navigate("/answer-repo/admin/login/");
  };

  return (
    <button className="btn error-page-btn" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default Logout;
