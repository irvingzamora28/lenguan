import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import api from "../../../utils/api";
import "../../../assets/scss/components/RegisterForm.scss";
import { refreshCsrfToken } from "../../../utils/csrf-token";

interface RegisterData {
	name: string;
	email: string;
	password: string;
	password_confirmation: string;
}

interface RegisterFormProps {}

const RegisterForm: React.FC<RegisterFormProps> = () => {
	const [registerData, setRegisterData] = useState<RegisterData>({
		name: "",
		email: "",
		password: "",
		password_confirmation: "",
	});
	const [errorMessage, setErrorMessage] = useState<string[]>();
	const [errors, setErrors] = useState<{ [key: string]: string[] }>({});

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setRegisterData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setErrors({});
		try {
			const response = await api.post("/api/register", registerData);
			if (response.data.message) {
				toast.success(response.data.message, {
					position: "top-right",
				});
			}
		} catch (error: any) {
			if (error.response && error.response.data.errors) {
				setErrors(error.response.data.errors);
			} else {
				setErrorMessage(["An error occurred. Please try again."]);
			}
		}
	};

	useEffect(() => {
		// Call the refreshCsrfToken function to start refreshing the token
		refreshCsrfToken();

		return () => {};
	}, []);

	return (
		<>
			<ToastContainer />
			<div className="register__general_error">
				{errorMessage && (
					<div className="register__form-error">
						<li>{errorMessage}</li>
					</div>
				)}
			</div>
			<form className="register__form" action="#" method="POST" onSubmit={handleSubmit}>
				<input type="hidden" name="remember" value="true" />
				<div className="register__form-container">
					<div className="register__form-control-field">
						<label htmlFor="name" className="sr-only">
							Name
						</label>
						<input id="name" name="name" type="text" autoComplete="name" required className={`register__input ${errors.name ? "is-invalid" : ""}`} onChange={handleChange} value={registerData.name} placeholder="Name" />
						{errors.name && (
							<div className="invalid-feedback">
								{errors.name.map((error) => (
									<p key={error}>{error}</p>
								))}
							</div>
						)}
					</div>
					<div className="register__form-control-field">
						<label htmlFor="email-address" className="sr-only">
							Email address
						</label>
						<input
							id="email-address"
							name="email"
							type="email"
							autoComplete="email"
							required
							className={`register__input ${errors.email ? "is-invalid" : ""}`}
							onChange={handleChange}
							value={registerData.email}
							placeholder="Email address"
						/>
						{errors.email && (
							<div className="invalid-feedback">
								{errors.email.map((error) => (
									<p key={error}>{error}</p>
								))}
							</div>
						)}
					</div>
					<div className="register__form-control-field">
						<label htmlFor="password" className="sr-only">
							Password
						</label>
						<input id="password" name="password" type="password" required className={`register__input ${errors.password ? "is-invalid" : ""}`} onChange={handleChange} value={registerData.password} placeholder="Password" />
						{errors.password && (
							<div className="invalid-feedback">
								{errors.password.map((error) => (
									<p key={error}>{error}</p>
								))}
							</div>
						)}
					</div>
					<div className="register__form-control-field">
						<label htmlFor="password_confirmation" className="sr-only">
							Confirm password
						</label>
						<input
							id="password_confirmation"
							name="password_confirmation"
							type="password"
							required
							className={`register__input ${errors.password ? "is-invalid" : ""}`}
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
		</>
	);
};

export default RegisterForm;
