// AuthContext.tsx
import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
  useLayoutEffect,
} from "react";
import axios from "axios";
import {
  InitTokens,
  clearTokens,
  getAccessToken,
  getRefreshToken,
  setAccessToken,
} from "./TokenService";

const BASE_URL = "http://127.0.0.1:8000/api/";
const STATUS_OK = 200;
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
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
      if (cookie.substring(0, name.length) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (getAccessToken()) {
      setIsAuthenticated(true);
    }
  }, []);

  useLayoutEffect(() => {
    const authRequestInteceptor = axiosInstance.interceptors.request.use(
      (config) => {
        config.headers.Authorization =
          !config && getAccessToken()
            ? `JWT ${getAccessToken()}`
            : config.headers.Authorization;
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => {
      axiosInstance.interceptors.request.eject(authRequestInteceptor);
    };
  }, [getAccessToken()]);

  useLayoutEffect(() => {
    const authResponseInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
          try {
            const response = await axiosInstance.post("token/refresh/");
            setAccessToken(response.data.access);
            originalRequest.headers.Authorization = `JWT ${getAccessToken()}`;
            originalRequest._retry = true;
            return axiosInstance(originalRequest);
          } catch (err) {
            console.log(`error in response interceptor ${err}`);
          }
        }
        return Promise.reject(error);
      }
    );
    return () => {
      axiosInstance.interceptors.response.eject(authResponseInterceptor);
    };
  }, [getAccessToken()]);

  const login = async (email: string | null, password: string | null) => {
    try {
      const response = await axiosInstance.post(`token/`, { email, password });
      if (response.status === STATUS_OK) {
        InitTokens(response.data.access, response.data.refresh);
        axiosInstance.defaults.headers[
          "Authorization"
        ] = `JWT ${getAccessToken()}`;
        setIsAuthenticated(true);
      } else {
        throw new Error("Login failed");
      }
    } catch (err) {
      // setToken(null);
      setIsAuthenticated(false);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        "http://127.0.0.1:8000/logout/blacklist/",
        { refresh_token: getRefreshToken() },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCookie("csrftoken"),
          },
        }
      );
      clearTokens();
    } catch (err) {
      throw new Error("Error during logout");
    }
    axios.defaults.headers["Authorization"] = null;
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
