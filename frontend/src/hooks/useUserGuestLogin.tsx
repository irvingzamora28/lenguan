import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { generateGuestUser } from "../utils/userUtils";
import { loginGuest, loginRequest } from "../redux/authSlice";

export const useUserGuestLogin = (path: string = "/") => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleLoginAsGuest = () => {
		const guestUser = generateGuestUser();
		dispatch(loginRequest());
		dispatch(loginGuest({ user: guestUser }));
		navigate(path);
	};

	return handleLoginAsGuest;
};
