import { Navigate } from "react-router-dom";
import { hasAccessToRoute } from "./helpers/permissions";

const ProtectedRoute = ({ children, path }) => {
  if (!hasAccessToRoute(path)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
