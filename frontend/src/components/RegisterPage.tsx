import React, { useEffect, useState } from "react";
import registerImage from "../assets/images/register-image.jpg";
import "../assets/scss/components/RegisterPage.scss";

import axios from "axios";

interface RegisterData {
	name: string;
	email: string;
	password: string;
	password_confirmation: string;
}

const RegisterPage: React.FC = () => {
	axios.defaults.baseURL = "http://localhost:8000/";

	const [registerData, setRegisterData] = useState<RegisterData>({
		name: "",
		email: "",
		password: "",
		password_confirmation: "",
	});
	const [errorMessage, setErrorMessage] = useState<string[]>();

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setRegisterData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setErrorMessage([]);

		try {
			await axios.get("/sanctum/csrf-cookie");
			const response = await axios.post("/api/register", registerData);
			// Handle successful registration
			console.log("response", response.data);
			// your axios request here
		} catch (error: any) {
			console.error("Error in handleSubmit:", error); // Add this line to log the error object
			if (error.response) {
				const { data } = error.response;
				const errorFields = Object.keys(data.errors);
				let errorMessageLines: string[] = [];
				errorFields.forEach((field) => {
					console.error(`${field}: ${data.errors[field][0]}`);
					errorMessageLines.push(`${data.errors[field][0]}`);
				});
				setErrorMessage(errorMessageLines);
			} else {
				console.error(error);
				setErrorMessage(["An error occurred. Please try again."]);
			}
			console.log(errorMessage);
		}
	};

	useEffect(() => {
		axios.get("/sanctum/csrf-cookie").then((response) => {
			// Now you can make API requests
			console.log("useEffect");
			console.log(response);
		});

		return () => {};
	}, []);

	return (
		<section className="register__section">
			<div className="register__section-content">
				<div>
					<img className="register__image" src={registerImage} alt="Register" />
					<div>
						<h2 className="register__heading">Create your account</h2>
					</div>
					{errorMessage && (
						<div className="register__error">
							{errorMessage.map((line, index) => (
								<li key={index}>{line}</li>
							))}
						</div>
					)}
				</div>
				<form className="register__form" action="#" method="POST" onSubmit={handleSubmit}>
					<input type="hidden" name="remember" value="true" />
					<div className="register__form-container">
						<div className="register__form-control-field">
							<label htmlFor="email-address" className="sr-only">
								Email address
							</label>
							<input id="email-address" name="email" type="email" autoComplete="email" required className="register__input" onChange={handleChange} value={registerData.email} placeholder="Email address" />
						</div>
						<div className="register__form-control-field">
							<label htmlFor="name" className="sr-only">
								Name
							</label>
							<input id="name" name="name" type="text" autoComplete="name" required className="register__input" onChange={handleChange} value={registerData.name} placeholder="Name" />
						</div>
						<div className="register__form-control-field">
							<label htmlFor="password" className="sr-only">
								Password
							</label>
							<input id="password" name="password" type="password" autoComplete="new-password" required className="register__input" onChange={handleChange} value={registerData.password} placeholder="Password" />
						</div>
						<div className="register__form-control-field">
							<label htmlFor="password_confirmation" className="sr-only">
								Confirm password
							</label>
							<input
								id="password_confirmation"
								name="password_confirmation"
								type="password"
								autoComplete="new-password"
								required
								className="register__input"
								placeholder="Confirm password"
								onChange={handleChange}
								value={registerData.password_confirmation}
							/>
						</div>
					</div>
					<div>
						<button type="submit" className="register__submit">
							Register
						</button>
					</div>
				</form>
			</div>
		</section>
	);
};

export default RegisterPage;
