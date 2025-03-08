import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const RoleBasedRoute = ({ children, allowedRole }) => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (!isLoading && isAuthenticated && user?.role !== allowedRole) {
    return <Navigate to="/unauthorized" replace />; // Handle unauthorized
  }
  return children;
};

RoleBasedRoute.propTypes = {
  allowedRole: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default RoleBasedRoute;
