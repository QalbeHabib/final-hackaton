import { Navigate, Outlet } from "react-router-dom";
import { useSelector} from "react-redux";

function PrivateRoute() {
  const loginUser = useSelector(state => state.users.isLoggedIn);
  return loginUser ? <Outlet /> : <Navigate to="/error" />;
}

export default PrivateRoute;










