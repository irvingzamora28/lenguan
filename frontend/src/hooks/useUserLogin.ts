import { useState } from "react";
import { useDispatch } from "react-redux";
import { LoginService } from "../services/LoginService";
import { loginFailure, loginRequest, loginSuccess } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

interface LoginData {
	email: string;
	password: string;
}

const useUserLogin = (path?: string) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [loginData, setLoginData] = useState<LoginData>({
		email: "",
		password: "",
	});
	const [errorMessages, setErrorMessages] = useState<string[]>();

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;

		setLoginData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleLogin = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		event.preventDefault();
		setErrorMessages([]); // Clear previous error message
		const { email, password } = loginData;

		if (email.trim() !== "" && password.trim() !== "") {
			dispatch(loginRequest());
			try {
				const response = await LoginService.login(loginData);
				const accessToken = response?.data?.token;
				dispatch(loginSuccess({ token: accessToken, user: response.data.user }));

				if (path) {
					navigate(path);
				}
			} catch (error: any) {
				if (error.response && error.response.data && error.response.data.message) {
					setErrorMessages([error.response.data.message]);
					dispatch(loginFailure(error.response.data.message));
				} else {
					let errorMessage = "An error occurred. Please try again.";
					setErrorMessages([errorMessage]);
					dispatch(loginFailure(errorMessage));
					throw new Error(errorMessage);
				}
			}
		} else {
			throw new Error("Invalid input");
		}
	};

	return { errorMessages, loginData, handleChange, handleLogin };
};

export default useUserLogin;
