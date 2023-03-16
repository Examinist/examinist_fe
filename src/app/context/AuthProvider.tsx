import {createContext, useState, ReactNode} from 'react'

type AuthContextType = {
    auth: any;
    setAuth: (auth: any) => void;

}
const AuthContext = createContext<AuthContextType>({
    auth: {},
    setAuth: () => {}
});

export function AuthProvider({children}: {children: ReactNode}) {
    const [auth, setAuth] = useState({});
  return (
    <AuthContext.Provider value={{auth, setAuth}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;

