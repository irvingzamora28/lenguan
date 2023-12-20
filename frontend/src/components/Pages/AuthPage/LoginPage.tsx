import React, { useEffect, useState } from "react";
import loginImage from "./../../../assets/images/login-image.jpg";
import { useAppDispatch } from "../../../redux/hooks";
import { loginRequest, loginSuccess, loginFailure, loginGuest } from "../../../redux/authSlice"; // import actions
import { useLocation, useNavigate } from "react-router-dom";
import LoginForm from "./../../Items/Forms/LoginForm";
import { LoginService } from "./../../../services/LoginService";
import { generateGuestUser } from "../../../utils/userUtils";
import { useUserGuestLogin } from "../../../hooks/useUserGuestLogin";

interface LoginData {
	email: string;
	password: string;
}

const LoginPage: React.FC = () => {
	const dispatch = useAppDispatch(); // initialize dispatch
	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from || "/";
	let pageTitle = location.state?.pageTitle || ""; // Default title '' if 'pageTitle' is not defined.
	const loginAsGuest = useUserGuestLogin(from);

	const [loginData, setLoginData] = useState<LoginData>({
		email: "",
		password: "",
	});
	const [errorMessage, setErrorMessage] = useState<string[]>();

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
			navigate(from);
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
			<div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
				<h1 className="text-5xl md:hidden font-semibold text-gray-600 justify-center self-center mb-12">Lenguan</h1>
				<div className="relative py-3 sm:max-w-xl sm:mx-auto">
					<div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
					<div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
						<div className="max-w-md mx-auto">
							<div>
								<h1 className="text-2xl font-semibold text-gray-600 hidden md:flex">Lenguan</h1>
								<h1 className="text-5xl font-semibold text-primary-500">{pageTitle}</h1>
							</div>
							<div className="divide-y divide-gray-200">
								<div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
									<LoginForm onSubmit={handleSubmit} onChange={handleChange} errorMessage={errorMessage} />
									<button onClick={loginAsGuest} className="mt-6 w-full bg-accent-400 hover:bg-accent-500 text-white font-bold py-2 px-4 rounded-full">
										Continue as Guest
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default LoginPage;
