// Example of storing user details in state upon login

import axios from "axios";
import { useEffect, useState } from "react";

const BASE_URL = "http://127.0.0.1:8000/api";

const useFetchAdminUser = () => {
  const [adminUser, setAdminUser] = useState<any>(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${BASE_URL}user/`, {
          headers: {
            Authorization: `JWT ${localStorage.getItem("access_token")}`,
          },
        });
        setAdminUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUser();
  }, []);
  return { adminUser };
};

export default useFetchAdminUser;
