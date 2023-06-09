import React, { useEffect, useState } from "react";
import loginImage from "./../../../assets/images/login-image.jpg";
import { useAppDispatch } from "../../../redux/hooks";
import { loginRequest, loginSuccess, loginFailure, loginGuest } from "../../../redux/authSlice"; // import actions
import { useNavigate } from "react-router-dom";
import LoginForm from "./../../Items/Forms/LoginForm";
import { LoginService } from "./../../../services/LoginService";

interface LoginData {
	email: string;
	password: string;
}

const LoginPage: React.FC = () => {
	const dispatch = useAppDispatch(); // initialize dispatch
	const navigate = useNavigate();
	const [loginData, setLoginData] = useState<LoginData>({
		email: "",
		password: "",
	});
	const [errorMessage, setErrorMessage] = useState<string[]>();

	const handleLoginGuest = () => {
		dispatch(loginGuest());
		navigate("/");
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setLoginData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setErrorMessage([]); // Clear previous error message
		dispatch(loginRequest()); // Dispatch login request

		try {
			const response = await LoginService.login(loginData);
			const accessToken = response?.data?.token;
			navigate("/");
			dispatch(loginSuccess({ token: accessToken, user: response.data.user }));
		} catch (error: any) {
			if (error.response && error.response.data && error.response.data.message) {
				setErrorMessage([error.response.data.message]); // Set error message from response
				dispatch(loginFailure(error.response.data.message)); // Dispatch login failure with error message
			} else {
				setErrorMessage(["An error occurred. Please try again."]); // Fallback error message
			}
			dispatch(loginFailure("An error occurred. Please try again.")); // Dispatch login failure with error message
		}
	};

	useEffect(() => {
		// Call the refreshCsrfToken function to start refreshing the token
		LoginService.refreshToken();
		return () => {};
	}, []);

	return (
		<>
			<div className="min-h-screen flex items-center justify-center bg-primary-100 py-12 px-4 sm:px-6 lg:px-8">
				<div className="max-w-md w-full space-y-8">
					<div>
						<img className="mx-auto h-28 w-auto md:h-80" src={loginImage} alt="Login" />
						<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
					</div>
					<LoginForm onSubmit={handleSubmit} onChange={handleChange} errorMessage={errorMessage} />
					<button onClick={handleLoginGuest} className="mt-6 w-full bg-accent-400 hover:bg-accent-500 text-white font-bold py-2 px-4 rounded-full">
						Continue as Guest
					</button>
				</div>
			</div>
		</>
	);
};

export default LoginPage;
