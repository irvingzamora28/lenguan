import { useState } from "react";
import { useDispatch } from "react-redux";
import { LoginService } from "../services/LoginService";
import { loginFailure, loginRequest, loginSuccess } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { User } from "../types";

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
	const [errorMessages, setErrorMessages] = useState<{ [key: string]: string[] }>({});

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;

		setLoginData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleLogin = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		event.preventDefault();
		setErrorMessages({}); // Clear previous error message
		const { email, password } = loginData;

		let errors: string[] = [];
		if (email.trim() === "") {
			errors.push("Email is required");
		}
		if (password.trim() === "") {
			errors.push("Password is required");
		}

		if (errors.length === 0) {
			dispatch(loginRequest());
			try {
				const response = await LoginService.login(loginData);
				const accessToken = response?.data?.token;
				handleLoginSuccess(accessToken, response.data.user);
				if (path) {
					navigate(path);
				}
			} catch (error: any) {
				if (error.response && error.response.data.errors) {
					setErrorMessages(error.response.data.errors);
					dispatch(loginFailure(error.response.data.errors));
				} else if (error.response.status == 419) {
					let errorMessage = "Session error. Please try againg shortly.";
					setErrorMessages({ errors: [errorMessage] });
					dispatch(loginFailure(error.response.data.message));
				} else if (error.response && error.response.data.message) {
					let errorMessage = error.response.data.message;
					setErrorMessages({ errors: [errorMessage] });
					dispatch(loginFailure(error.response.data.message));
				} else {
					let errorMessage = "An error occurred. Please try again.";
					setErrorMessages({ ...errorMessages, error: [...errorMessages.error, errorMessage] });
					dispatch(loginFailure(errorMessage));
					throw new Error(errorMessage);
				}
			}
		} else {
			setErrorMessages({ errors: errors });
		}
	};

	const handleLoginSuccess = (token: string, user: User) => {
		dispatch(loginSuccess({ token, user }));
	};

	return { errorMessages, loginData, handleChange, handleLogin, handleLoginSuccess };
};

export default useUserLogin;
