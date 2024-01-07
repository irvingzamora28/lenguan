import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import "../../../assets/scss/components/RegisterForm.scss";
import { refreshCsrfToken } from "../../../utils/csrf-token";
import { AxiosResponse } from "axios";

interface RegisterData {
	name: string;
	email: string;
	password: string;
	password_confirmation: string;
}

interface RegisterFormProps {
	onRegister: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	registerResponse: AxiosResponse<any, any> | undefined;
	registerData: RegisterData;
	errorMessages: { [key: string]: string[] };
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onRegister, onChange, registerResponse, registerData, errorMessages }) => {
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
	};

	useEffect(() => {
		// Call the refreshCsrfToken function to start refreshing the token
		refreshCsrfToken();
		return () => {};
	}, []);

	useEffect(() => {
		if (registerResponse?.data.message) {
			toast.success(registerResponse.data.message, {
				position: "top-right",
			});
		}
	}, [registerResponse]);

	return (
		<>
			<ToastContainer />
			<div className="register__general_error">
				{errorMessages.error && (
					<div className="register__form-error">
						{errorMessages.error.map((error: string) => (
							<p>{error}</p>
						))}
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
						<input id="name" name="name" type="text" autoComplete="name" required className={`register__input ${errorMessages.name ? "is-invalid" : ""}`} onChange={onChange} value={registerData.name} placeholder="Name" />
						{errorMessages.name && (
							<div className="invalid-feedback">
								{errorMessages.name.map((error: string) => (
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
							className={`register__input ${errorMessages.email ? "is-invalid" : ""}`}
							onChange={onChange}
							value={registerData.email}
							placeholder="Email address"
						/>
						{errorMessages.email && (
							<div className="invalid-feedback">
								{errorMessages.email.map((error: string) => (
									<p key={error}>{error}</p>
								))}
							</div>
						)}
					</div>
					<div className="register__form-control-field">
						<label htmlFor="password" className="sr-only">
							Password
						</label>
						<input id="password" name="password" type="password" required className={`register__input ${errorMessages.password ? "is-invalid" : ""}`} onChange={onChange} value={registerData.password} placeholder="Password" />
						{errorMessages.password && (
							<div className="invalid-feedback">
								{errorMessages.password.map((error: string) => (
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
							className={`register__input ${errorMessages.password ? "is-invalid" : ""}`}
							placeholder="Confirm password"
							onChange={onChange}
							value={registerData.password_confirmation}
						/>
					</div>
				</div>
				<div>
					<button type="submit" onClick={onRegister} className="register__submit">
						Register
					</button>
				</div>
			</form>
		</>
	);
};

export default RegisterForm;
