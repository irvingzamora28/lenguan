// import React, { createContext, useState, useEffect, ReactNode, Dispatch, SetStateAction } from 'react';
// import api from "../utils/api";

// interface AuthContextProps {
//   isAuthenticated: boolean;
//   isLoading: boolean;  // Add this
//   auth: object;
//   setAuth: Dispatch<SetStateAction<{}>>;
//   login: (email: string, password: string) => Promise<void>;
//   logout: () => void;
// }

// const AuthContext = createContext<Partial<AuthContextProps>>({});

// interface AuthProviderProps {
//   children: ReactNode;
// }

// const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
//   const [isLoading, setIsLoading] = useState<boolean>(true);  // Add this
//   const [auth, setAuth] = useState({})

//   const login = async (email: string, password: string) => {
//     console.log(`'loigin`);

//     setIsLoading(true);
//     try {
//       const response = await api.post("/api/login", { email, password });
//       setIsAuthenticated(true);
//     } catch (error) {
//       setIsAuthenticated(false);
//     } finally {
//       setIsLoading(false); // loading has finished after login attempt
//     }
//   };

//   const logout = () => {
//     setIsAuthenticated(false);
//   };

//   useEffect(() => {
//     // Check the authentication status when the component mounts
//     // This might involve checking local storage or making a request to your backend, depending on your needs
//     // For instance, if you want to check if a valid JWT is present in local storage
//     setIsLoading(true);
//     const jwt = window.localStorage.getItem('jwt');
//     if (jwt) {
//       // Logic to validate the JWT goes here. If the JWT is valid, set isAuthenticated to true.
//     }
//     setIsLoading(false); // loading has finished after initial check
//   }, []);

//   return (
//     <AuthContext.Provider value={{auth, setAuth, isAuthenticated, isLoading, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export { AuthContext, AuthProvider };
