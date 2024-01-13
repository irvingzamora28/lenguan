import { useDispatch } from "react-redux";
import { resetCourseState } from "../redux/courseSlice";
import { resetLanguageState } from "../redux/languageSlice";
import { logout } from "../redux/authSlice";

const useUserLogout = () => {
	const dispatch = useDispatch();

	const handleLogout = async (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		event?.preventDefault();
		dispatch(logout());
		dispatch(resetCourseState());
		dispatch(resetLanguageState());
	};

	return { handleLogout };
};

export default useUserLogout;
