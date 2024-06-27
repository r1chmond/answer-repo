import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api/";
const STATUS_OK = 200;
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string | null, password: string | null) => Promise<void>;
  logout: () => Promise<void>;
}

const getCookie = (name: string): string | null => {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("access_token")
  );

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    // Setup Axios Interceptors for handling expired tokens
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("access_token");
        if (token) {
          config.headers.Authorization = `JWT ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          const refreshToken = localStorage.getItem("refresh_token");
          console.log(
            `response interceptor ----> refresh token ${refreshToken}`
          );
          if (refreshToken) {
            try {
              const response = await axiosInstance.post("token/refresh/", {
                refresh: refreshToken,
              });
              localStorage.setItem("access_token", response.data.access);
              axiosInstance.defaults.headers.Authorization = `JWT ${response.data.access}`;
              originalRequest.headers.Authorization = `JWT ${response.data.access}`;
              return axiosInstance(originalRequest);
            } catch (refreshError) {
              console.error("Token refresh failed", refreshError);
              setIsAuthenticated(false);
              throw refreshError;
            }
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  const login = async (email: string | null, password: string | null) => {
    try {
      const response = await axiosInstance.post(`token/`, { email, password });
      if (response.status === STATUS_OK) {
        localStorage.setItem("access_token", response.data.access);
        localStorage.setItem("refresh_token", response.data.refresh);
        axiosInstance.defaults.headers[
          "Authorization"
        ] = `JWT ${response.data.access}`;
        setIsAuthenticated(true);
      } else {
        throw new Error("Login failed");
      }
    } catch (err) {
      setIsAuthenticated(false);
      throw err;
    }
  };

  const logout = async () => {
    const refreshToken = localStorage.getItem("refresh_token");
    try {
      await axiosInstance.post(
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
      throw new Error("Error during logout");
    }
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    axiosInstance.defaults.headers["Authorization"] = null;
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
