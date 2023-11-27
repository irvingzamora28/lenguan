import React, { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

// Hooks
import { useIsAuthenticated, useIsGuest, useSelectedLanguage, useSelectedCourse, useUser } from "../../redux/hooks";

// Utils and constants
import { routeTitles } from "./../../utils/routeLoginTitles";
import * as Routes from "./../../constants/routes";

interface PrivateRouteProps {
	children: ReactNode;
}

interface RouteCondition {
	condition: () => boolean;
	path: string;
}

/**
 * PrivateRoute component ensures user access based on authentication status and selected language/course.
 */
const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
	const isAuthenticated = useIsAuthenticated();
	const isGuest = useIsGuest();
	const selectedLanguage = useSelectedLanguage();
    const user = useUser();
	const selectedCourse = useSelectedCourse();
	const location = useLocation();

	const routesToCheck: RouteCondition[] = [
		{ condition: () => !user?.language, path: Routes.SELECT_LANGUAGE_PATH },
		{ condition: () => !user?.course, path: Routes.SELECT_COURSE_PATH },
	];

	if (isAuthenticated || isGuest) {
		const redirectPath = getRedirectPath(location.pathname, routesToCheck, location.state?.lastRedirectedPath);
		if (redirectPath) {
			return <Navigate to={redirectPath} state={{ from: location, lastRedirectedPath: redirectPath }} />;
		}

		return <>{children}</>;
	} else {
		return <Navigate to="/login" state={{ from: location, pageTitle: routeTitles[location.pathname] }} />;
	}
};

/**
 * Determines the appropriate redirect path based on the user's status.
 * @param currentPath - The current route path.
 * @param conditions - An array of conditions to check.
 * @param lastRedirectedPath - The last path the user was redirected to.
 * @returns - Redirect path or null if no redirection is needed.
 */
function getRedirectPath(currentPath: string, conditions: RouteCondition[], lastRedirectedPath?: string): string | null {
	for (let routeInfo of conditions) {
		if (lastRedirectedPath === routeInfo.path) break;
		if (currentPath !== routeInfo.path && routeInfo.condition()) {
			return routeInfo.path;
		}
	}
	return null;
}

export default PrivateRoute;
