import { AxiosResponse } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterService } from "../services/RegisterService";

interface RegisterData {
	name: string;
	email: string;
	password: string;
	password_confirmation: string;
}

const useUserRegister = (path?: string) => {
	const navigate = useNavigate();
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

		if (email.trim() !== "" && password.trim() !== "" && name.trim() !== "" && password === password_confirmation) {
			try {
				const response = await RegisterService.register(registerData);
				if (path) {
					// Redirect after a short delay to allow the user to see the notification
					setTimeout(() => navigate(path), 5000);
				}
				setRegisterResponse(response);
			} catch (error: any) {
				if (error.response && error.response.data.errors) {
					setErrorMessages(error.response.data.errors);
				} else {
					let errorMessage = "An error occurred. Please try again.";
					setErrorMessages({ error: [errorMessage] });
					throw new Error(errorMessage);
				}
			}
		} else {
			console.log(registerData);
			setErrorMessages({ error: ["Invalid input"] });
			throw new Error("Invalid input");
		}
	};

	return { errorMessages, registerData, registerResponse, handleChange, handleRegister };
};

export default useUserRegister;
