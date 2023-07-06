import React, { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useIsAuthenticated, useIsGuest, useSelectedLanguage } from "../../redux/hooks";
import { routeTitles } from "./../../utils/routeLoginTitles";

interface PrivateRouteProps {
	children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
	const isAuthenticated = useIsAuthenticated();
	const isGuest = useIsGuest();
	const location = useLocation();
    const selectedLanguage = useSelectedLanguage();

    // Check if the user is authenticated or a guest
	return isAuthenticated || isGuest ? (
        // If the user has already a language continue, otherwise redirect to select-language page
        selectedLanguage ? <>{children}</> : <Navigate to="/select-language" state={{ from: location }} />
      ) : (
        <Navigate
          to="/login"
          state={{ from: location, pageTitle: routeTitles[location.pathname] }}
        />
      );
};

export default PrivateRoute;
