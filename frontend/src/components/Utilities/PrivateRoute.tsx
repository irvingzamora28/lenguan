import React, { ReactNode, useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
// import { AuthContext } from "../../contexts/AuthContext";

interface PrivateRouteProps {
    children: ReactNode;
  }

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children}) => {
  const { auth } = useContext(AuthContext);
  const location = useLocation();
    console.log(auth);

  return auth && Object.keys(auth).length !== 0 ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

export default PrivateRoute;
