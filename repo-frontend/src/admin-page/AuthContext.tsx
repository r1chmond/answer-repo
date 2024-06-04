// AuthContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";

interface AuthContextProps {
  user: any;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Fetch the current user if already authenticated
    axios
      .get("/api/current_user/")
      .then((response) => setUser(response.data))
      .catch(() => setUser(null));
  }, []);

  const login = async (email: string, password: string) => {
    const response = await axios.post("/answer-repo/admin/login/", {
      email,
      password,
    });
    setUser(response.data.user);
  };

  const logout = async () => {
    await axios.post("/answer-repo/admin/logout/");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
