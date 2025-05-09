import { Navigate, useLocation } from "react-router-dom";
import { hasAccessToRoute } from "./helpers/permissions";

const ProtectedRoute = ({ children, path }) => {
  const location = useLocation();
  const token = localStorage.getItem("jwtToken");

  if (!token)
    return <Navigate to="/login" replace state={{ from: location }} />;

  if (!hasAccessToRoute(path))
    return <Navigate to="/" replace state={{ from: location }} />;

  return children;
};

export default ProtectedRoute;
