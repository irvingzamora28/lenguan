import React, { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";

interface AuthContextProps {
    auth: object;
    setAuth: Dispatch<SetStateAction<{}>>;
  }

const AuthContext = createContext<Partial<AuthContextProps>>({});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState({})

  return (
    <AuthContext.Provider value={{auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
