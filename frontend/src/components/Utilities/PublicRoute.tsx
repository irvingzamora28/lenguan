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

	// List of public routes that can also be accessed by authenticated users
    const publicAndPrivateRoutes = ["/gender-duel", "/gender-duel/:room_id"];

    // Helper function to check if the current path matches any of the public and private routes
    const isPublicAndPrivateRoute = (pathname: string) => {
        return publicAndPrivateRoutes.some(route => {
            const regex = new RegExp(`^${route.replace(/:\w+/g, "\\w+")}$`);
            return regex.test(pathname);
        });
    };

    // If the user is authenticated or is a guest, allow them to access the public routes.
    // If the user is not authenticated or is a guest, redirect them to the login page.
    // If the route is a public and private route, allow them to access the route.
    return isAuthenticated || isGuest ? isPublicAndPrivateRoute(location.pathname) ? <>{children}</> : <Navigate to="/" state={{ from: location }} /> : <>{children}</>;
};

export default PublicRoute;
