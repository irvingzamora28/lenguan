import React, { useContext, useEffect, useState } from "react";
import loginImage from "../../../assets/images/login-image.jpg";
import { useAppDispatch } from "../../../redux/hooks";
import { loginRequest, loginSuccess, loginFailure } from "../../../redux/authSlice"; // import actions
import api from "../../../utils/api";
import { refreshCsrfToken } from "../../../utils/csrf-token";
import { Link } from "react-router-dom";

interface LoginData {
	email: string;
	password: string;
}

const LoginPage: React.FC = () => {
	const dispatch = useAppDispatch(); // initialize dispatch
	const [success, setSuccess] = useState(false);
	// const { login } = useContext(AuthContext);
	// console.log(login);
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
			console.log(`Before login`);

			const response = await api.post("/api/login", loginData);
			console.log(response);
			const accessToken = response?.data?.token;
			setSuccess(true);
			// await login(loginData.email, loginData.password);
			// dispatch(loginSuccess({ token: response.data.token, user: response.data.user }));
		} catch (error: any) {
			console.log(`error`);
			console.log(error);

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
		refreshCsrfToken();

		return () => {};
	}, []);

	return (
		<>
        {
            success ?
            (
                <section>
                    <h1>You are logged in!</h1>
                    <br />
                    <p>
                        <Link to={"/"} >Go to Home</Link>
                    </p>
                </section>
            ) : (
			<div className="min-h-screen flex items-center justify-center bg-primary-100 py-12 px-4 sm:px-6 lg:px-8">
				<div className="max-w-md w-full space-y-8">
					<div>
						<img className="mx-auto h-28 w-auto md:h-80" src={loginImage} alt="Login" />
						<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
					</div>
					<form className="mt-8 space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
						<input type="hidden" name="remember" value="true" />
						<div className="rounded-md shadow-sm space-y-3">
							<div>
								<label htmlFor="email-address" className="sr-only">
									Email address
								</label>
								<input
									id="email-address"
									name="email"
									type="email"
									autoComplete="email"
									required
									className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
									placeholder="Email address"
									onChange={handleChange}
								/>
							</div>
							<div>
								<label htmlFor="password" className="sr-only">
									Password
								</label>
								<input
									id="password"
									name="password"
									type="password"
									autoComplete="current-password"
									required
									className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
									placeholder="Password"
									onChange={handleChange}
								/>
							</div>
						</div>
						{errorMessage && (
							<div className="login__error">
								{errorMessage.map((line, index) => (
									<li key={index}>{line}</li>
								))}
							</div>
						)}
						<div className="flex items-center justify-between">
							<div className="text-sm">
								<a href="#" className="font-medium text-primary-600 hover:text-primary-500">
									Forgot your password?
								</a>
							</div>
						</div>
						<div>
							<button
								type="submit"
								className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
							>
								Sign in
							</button>
						</div>
					</form>
				</div>
			</div>

            )
        }
		</>
	);
};

export default LoginPage;
