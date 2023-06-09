import React, { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useIsAuthenticated, useIsGuest } from "../../redux/hooks";

interface PrivateRouteProps {
	children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
	const isAuthenticated = useIsAuthenticated();
	const isGuest = useIsGuest();
	const location = useLocation();

    // Check if the user is authenticated or a guest
	return isAuthenticated || isGuest
		? <>{children}</>
		: <Navigate to="/login" state={{ from: location }} />;
};

export default PrivateRoute;
