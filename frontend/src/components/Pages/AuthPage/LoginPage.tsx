import React, { useEffect } from "react";
import loginImage from "./../../../assets/images/login-image.png";
import "../../../assets/scss/components/LoginPage.scss";
import { Link, useLocation } from "react-router-dom";
import LoginForm from "./../../Items/Forms/LoginForm";
import { LoginService } from "./../../../services/LoginService";
import useUserGuestLogin from "../../../hooks/useUserGuestLogin";
import useUserLogin from "../../../hooks/useUserLogin";

const LoginPage: React.FC = () => {
	const location = useLocation();
	const from = location.state?.from || "/";
	let pageTitle = location.state?.pageTitle || ""; // Default title '' if 'pageTitle' is not defined.
	const { handleLoginAsGuest } = useUserGuestLogin(from);
	const { errorMessages, loginData, handleChange, handleLogin } = useUserLogin(from);

	useEffect(() => {
		// Call the refreshCsrfToken function to start refreshing the token
		LoginService.refreshToken();
		return () => {};
	}, []);

	return (
		<>
			<header className="flex flex-wrap justify-between items-center p-6 md:flex-row">
				<Link to="/" className="flex items-center">
					<h1 className="text-2xl font-bold mb-2 md:mb-0 text-primary-800">Lenguan</h1>
				</Link>

				<div className="flex space-x-4">
					<Link to="/register" className="bg-primary-500 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded">
						Register
					</Link>
				</div>
			</header>
			<section className="login__section">
				<div className="login__section-content">
					<div className="md:flex">
						<div className="flex md:w-1/2 justify-center items-center">
							<div className="flex justify-center md:block">
								<img className="login__image rounded-full md:rounded-lg shadow-lg max-w-xs lg:max-w-md" src={loginImage} alt="Register" />
							</div>
						</div>

						<div className="md:w-1/2">
							<h2 className="login__heading">Login to Your Account</h2>
							<LoginForm onLogin={handleLogin} onChange={handleChange} errorMessages={errorMessages} onLoginAsGuest={handleLoginAsGuest} />
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default LoginPage;
