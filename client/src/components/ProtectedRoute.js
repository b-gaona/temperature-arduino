import useNavigation from "../hooks/use-navigation";
import useUsersContext from "../hooks/use-users-context";

function ProtectedRoute({ path, children, redirectPath }) {
  const { currentPath, navigate } = useNavigation();
  const { user } = useUsersContext();

  if (!user.nombre || !user.clave) {
    navigate(redirectPath);
  }
  else if (path === currentPath) {
    return children;
  }
  return null;
}

export default ProtectedRoute;
