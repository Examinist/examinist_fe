import { useLocation, Navigate, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { loginAPI } from "../../services/AuthApi";
import { User } from "../../context/AuthProvider";

const RequireAuth = ({ allowedRole }: { allowedRole: string }) => {
  const { isAuthenticated, user, setUser, setIsAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
 useEffect(() => {
  setIsLoading(true);
    setTimeout(() => {
          const user: User = {
            role: "instructor",
            username: "nohaahmed",
            first_name: "Noha",
            last_name: "Ahmed",
            auth_token: "1212398u798u7",
          };
          setIsAuthenticated(true);
          setUser(user);
          setIsLoading(false);
    }, 500);
 }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  if(!isAuthenticated) {
    console.log("not authenticated");
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (user?.role !== allowedRole) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />
  }
  

  return <Outlet/>
};

export default RequireAuth;
