// ProtectedRoute.tsx
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../admin-page/AuthContext";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect them to the login page and preserve the current location
    return (
      <Navigate
        to={`/answer-repo/admin/login?from=${location.pathname}`}
        replace
      />
    );
  }

  return children;
};

export default ProtectedRoute;
