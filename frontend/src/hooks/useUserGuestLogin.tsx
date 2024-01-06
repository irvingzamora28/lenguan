import { useNavigate } from "react-router-dom";
import { useAppDispatch, useCourses, useLanguages } from "../redux/hooks";
import { generateGuestUser } from "../utils/userUtils";
import { loginGuest, loginRequest } from "../redux/authSlice";
import { getLanguages } from "../utils/languages";

const useUserGuestLogin = (path?: string) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const languages = useLanguages();
	const courses = useCourses();

	// Fetch the languages available to select
	getLanguages(languages, dispatch);

	const handleLoginAsGuest = async () => {
		dispatch(loginRequest());
		const guestUser = generateGuestUser();
		dispatch(loginGuest({ user: guestUser }));
		if (path) {
			navigate(path);
		}
	};

	return { handleLoginAsGuest };
};

export default useUserGuestLogin;
