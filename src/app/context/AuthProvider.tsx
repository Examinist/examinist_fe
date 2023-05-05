import { createContext, useState, ReactNode, useEffect } from "react";
import IUser, { UserRoleEnum } from "../types/User";
import {
  getUserProfileAPI,
  IGetUserProfileResponse,
} from "../services/APIs/AuthAPIs";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import { ISignInInputs } from "../pages/SignIn/components/SignInForm";

type AuthContextType = {
  isAuthenticated: boolean;
  user?: IUser;
  role?: UserRoleEnum;
  login: (user: IUser) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<IUser>();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const redirectToLogin = () => navigate("/login", { replace: true });

  const GoToHomePage = (user: IUser) => {
    switch (user.role) {
      case UserRoleEnum.INSTRUCTOR:
        navigate("/instructor", { replace: true });
        break;
      case UserRoleEnum.FACULTY_ADMIN:
        navigate("/faculty_admin", { replace: true });
        break;
    }
  };

  const login = (user?: IUser) => {
    console.log(user);
    setIsAuthenticated(true);
    // user!.role = UserRoleEnum.FACULTY_ADMIN;
    setUser(user);
    GoToHomePage(user!);
  };

  const logout = () => {};

  useEffect(() => {
    getUserProfileAPI()
      .then(({ data }: IGetUserProfileResponse) => {
        const user = data.user_info;
        // user.role = UserRoleEnum.FACULTY_ADMIN;
        setIsAuthenticated(true);
        setUser(user);
        if (location.pathname == "/login" || location.pathname == "/")
          GoToHomePage(user);
      })
      .catch(() => redirectToLogin())
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const value = {
    user,
    isAuthenticated,
    role: user?.role as UserRoleEnum,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {isLoading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      )}
      {!isLoading && children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
