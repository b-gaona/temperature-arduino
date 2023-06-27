import useUsersContext from "../hooks/use-users-context";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ redirectPath = "/login", children }) {
  const { user } = useUsersContext();

  if (!user.nombre || !user.clave) {
    return <Navigate to={redirectPath} replace />;
  }
  return children ? children : <Outlet />;
}

export default ProtectedRoute;
