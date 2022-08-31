import { Navigate, Outlet } from "react-router-dom";
import { useSelector} from "react-redux";

function AdminRoute({ isLogged }) {
  const loginUser = useSelector(state => state.users.isAdminLogin);
  return (loginUser ? <Outlet /> : <Navigate to="/error" />)
}

export default AdminRoute;