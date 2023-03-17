import { useLocation, Navigate, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { loginAPI } from "../../apis/AuthApi";

const RequireAuth = ({ allowedRole }: { allowedRole: string }) => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // useEffect(() => {
  //   loginAPI({}).then((res) => {
  //     setAuth(res.data);
  //     if(res.message !== "success") {
  //         navigate("/login", {state:{ from: location }, replace: true});
  //     }
  //     else if(res.data.role !== allowedRole) {
  //       navigate("/unauthorized");
  //     }
  //     else{
  //       navigate(location.pathname);
  //     }
  //   });
  // }, []);


  
  return localStorage.getItem("auth_token") ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );


};

export default RequireAuth;
