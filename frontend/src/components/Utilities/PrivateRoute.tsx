import React, { ReactNode, useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useIsAuthenticated } from "../../redux/hooks";

interface PrivateRouteProps {
	children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
	const isAuthenticated = useIsAuthenticated();
	const location = useLocation();
	console.log(isAuthenticated);

	return isAuthenticated ? <>{children}</> : <Navigate to="/login" state={{ from: location }} />;
};

export default PrivateRoute;
