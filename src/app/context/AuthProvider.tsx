import { createContext, useState, ReactNode, useEffect } from "react";
import IUser, { UserRoleEnum, userRoleToPathMap } from "../types/User";
import {
  getUserProfileAPI,
  IGetUserInfoResponse,
  logoutAPI,
} from "../services/APIs/AuthAPIs";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import { setupResponseInterceptor } from "../services/AxiosConfig";
import useAlert from "../hooks/useAlert";
import { StudentExamLocalStorageKey } from "../types/StudentPortalStudentExam";

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
  const { setAlertState } = useAlert();

  const redirectToLogin = () => navigate("/login", { replace: true });

  const GoToHomePage = (user: IUser) => {
    navigate(userRoleToPathMap[user.role], { replace: true });
  };

  const login = (user?: IUser) => {
    setIsAuthenticated(true);
    setUser(user);
    GoToHomePage(user!);
  };

  const logout = () => {
    logoutAPI()
      .then(() => {
        localStorage.clear();
        navigate("/login");
      })
      .catch(() => {
        setAlertState({
          open: true,
          severity: "error",
          message: "Error logging out, please try again.",
        });
      });
  };

  useEffect(() => {
    getUserProfileAPI()
      .then(({ data }: IGetUserInfoResponse) => {
        const user = data.user_info;
        setIsAuthenticated(true);
        setUser(user);
        if (
          user.role === UserRoleEnum.STUDENT &&
          StudentExamLocalStorageKey in localStorage
        ) {
          const examId = localStorage.getItem(StudentExamLocalStorageKey);
          navigate(`/student/exams/${examId}`, { replace: true });
        } else if (
          location.pathname === "/login" ||
          location.pathname === "/"
        ) {
          GoToHomePage(user);
        }
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
