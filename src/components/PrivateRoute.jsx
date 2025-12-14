import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * PrivateRoute
 * - Protects authenticated routes
 * - Supports multiple allowed roles
 */
const PrivateRoute = ({ allowedRoles, children }) => {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  // Not logged in → redirect to login
  if (!user) return <Navigate to="/login" replace />;

  // Role check
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children ? children : <Outlet />;
};

export default PrivateRoute;
