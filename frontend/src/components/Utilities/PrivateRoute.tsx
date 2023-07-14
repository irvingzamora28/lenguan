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
	const selectedLanguage = useSelectedLanguage();
	const location = useLocation();

	if (isAuthenticated || isGuest) {
		if (!selectedLanguage && location.state?.from?.pathname !== "/select-language") {
			return <Navigate to="/select-language" state={{ from: location }} />;
		}
		return <>{children}</>;
	} else {
		return <Navigate to="/login" state={{ from: location, pageTitle: routeTitles[location.pathname] }} />;
	}
};

export default PrivateRoute;
