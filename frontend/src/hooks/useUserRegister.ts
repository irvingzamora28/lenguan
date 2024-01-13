import { AxiosResponse } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterService } from "../services/RegisterService";
import useUserLogout from "./useUserLogout";
import { LoginService } from "../services/LoginService";
import useUserLogin from "./useUserLogin";
import { refreshCsrfToken } from "../utils/csrf-token";

interface RegisterData {
	name: string;
	email: string;
	password: string;
	password_confirmation: string;
}

const useUserRegister = (path?: string) => {
	const navigate = useNavigate();
	const { handleLoginSuccess } = useUserLogin();
	const { handleLogout } = useUserLogout();

	const [registerData, setRegisterData] = useState<RegisterData>({
		name: "",
		email: "",
		password: "",
		password_confirmation: "",
	});
	const [errorMessages, setErrorMessages] = useState<{ [key: string]: string[] }>({});
	const [registerResponse, setRegisterResponse] = useState<AxiosResponse<any, any>>();

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;

		setRegisterData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleRegister = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		event.preventDefault();
		setErrorMessages({}); // Clear previous error message

		const { name, email, password, password_confirmation } = registerData;
		let errors: string[] = [];
		if (email.trim() === "") {
			errors.push("Email is required");
		}
		if (password.trim() === "") {
			errors.push("Password is required");
		}
		if (name.trim() === "") {
			errors.push("Name is required");
		}
		if (password !== password_confirmation) {
			errors.push("Passwords do not match");
		}

		if (errors.length === 0) {
			try {
				const responseRegister = await RegisterService.register(registerData);
				const responseLogin = await LoginService.login(registerData);
				if (path) {
					// Redirect after a short delay to allow the user to see the notification
					setTimeout(() => {
						handleLogout();
						const accessToken = responseLogin?.data?.token;
						handleLoginSuccess(accessToken, responseLogin.data.user);
						refreshCsrfToken();
						navigate(path);
					}, 7000);
				}
				setRegisterResponse(responseRegister);
			} catch (error: any) {
				console.log(error);

				if (error.response && error.response.data.errors) {
					setErrorMessages(error.response.data.errors);
				} else if (error.response.status == 419) {
					let errorMessage = "Session error. Please try againg shortly.";
					setErrorMessages({ errors: [errorMessage] });
				} else if (error.response && error.response.data.message) {
					let errorMessage = error.response.data.message;
					setErrorMessages({ errors: [errorMessage] });
				} else {
					let errorMessage = "An error occurred. Please try again.";
					setErrorMessages({ ...errorMessages, error: [...errorMessages.error, errorMessage] });
					throw new Error(errorMessage);
				}
			}
		} else {
			setErrorMessages({ errors: errors });
		}
	};

	return { errorMessages, registerData, registerResponse, handleChange, handleRegister };
};

export default useUserRegister;
