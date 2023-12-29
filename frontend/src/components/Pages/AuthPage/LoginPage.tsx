import React, { useEffect, useState } from "react";
import loginImage from "./../../../assets/images/login-image.jpg";
import { useLocation } from "react-router-dom";
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
		<div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
			<LoginForm onLogin={handleLogin} onChange={handleChange} errorMessages={errorMessages} onLoginAsGuest={handleLoginAsGuest} />
		</div>
	);
};

export default LoginPage;
