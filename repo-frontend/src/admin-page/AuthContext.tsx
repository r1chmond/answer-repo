import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

interface AuthContextData {
  signed: boolean;
  user: User | null;
  signIn(email: string, password: string): Promise<void>;
  signOut(): void;
}

interface User {
  email: string;
  is_admin: boolean;
  is_staff: boolean;
  is_owner: boolean;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      api.defaults.headers.Authorization = `Token ${storedToken}`;
    }
  }, []);
  async function signIn(email: string, password: string) {
    const response = await api.post("/rest-auth/login", { email, password });
    const userData = await api.get("/rest-auth/user");
    setUser(userData.data);
    localStorage.setItem("user", JSON.stringify(userData.data));
    localStorage.setItem("token", response.data.key);
    api.defaults.headers.Authorization = `Token ${response.data.key}`;
  }

  function signOut() {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    api.defaults.headers.Authorization = null;
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
