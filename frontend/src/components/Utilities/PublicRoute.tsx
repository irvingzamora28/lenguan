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

    // Check if the user is authenticated
	return isAuthenticated || isGuest ? (
        <Navigate
          to="/"
          state={{ from: location }}
        />
      ) : (
        <>{children}</>
      );
};

export default PublicRoute;
