import { FC } from "react";
import { RouteProps, Navigate } from "react-router-dom";
import { useIsAuthenticated } from "../../redux/hooks";

const PrivateRoute: FC<RouteProps> = ({ children }) => {
    const isAuthenticated = useIsAuthenticated();
	if (!children) {
		return null;
	}

	return isAuthenticated ? (
		<>{children}</>
	) : (
		<>
			<Navigate to="/login" />
		</>
	);
};

export default PrivateRoute;
