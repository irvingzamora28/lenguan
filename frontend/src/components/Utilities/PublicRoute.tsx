import React, { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useIsAuthenticated, useIsGuest } from "../../redux/hooks";

interface PublicRouteProps {
	children: ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
	const isAuthenticated = useIsAuthenticated();
	const isGuest = useIsGuest();
	const location = useLocation();

	const publicAndPrivateRoutes = ["/gender-duel"];

	// If the user is authenticated or is a guest, allow them to access the public routes.
	// If the user is not authenticated or is a guest, redirect them to the login page.
	// If the route is a public and private route, allow them to access the route.
	return isAuthenticated || isGuest ? publicAndPrivateRoutes.includes(location.pathname) ? <>{children}</> : <Navigate to="/" state={{ from: location }} /> : <>{children}</>;
};

export default PublicRoute;
