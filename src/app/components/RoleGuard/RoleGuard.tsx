import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { UserRoleEnum } from "../../types/User";

const RoleGuard = ({ allowedRole }: { allowedRole: UserRoleEnum }) => {
  const { role } = useAuth();
  const location = useLocation();

  if (role === allowedRole) return <Outlet />;

  return <Navigate to="/unauthorized" state={{ from: location }} replace />;
};

export default RoleGuard;
