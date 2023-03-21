import { createContext, useState, ReactNode } from "react";

export type User = {
  auth_token: string;
  role: string;
  username: string;
  first_name: string;
  last_name: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user?: User;
  setUser: (user: User) => void;
  setIsLoading: (isLoading: boolean) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
};

const AuthContext = createContext<AuthContextType>({
  setUser: () => {},
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  isLoading: false,
  setIsLoading: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState({} as User);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <AuthContext.Provider value={{user, isAuthenticated, isLoading, setUser, setIsAuthenticated, setIsLoading}}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
