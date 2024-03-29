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
	simple: boolean;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onRegister, onChange, registerResponse, registerData, errorMessages, simple = false }) => {
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
				autoClose: 7000,
			});
		}
	}, [registerResponse]);

	return (
		<>
			<ToastContainer />
			<div className="relative py-3 mx-auto max-w-xs sm:max-w-xl md:max-w-2xl">
				<div className={`absolute inset-0 bg-gradient-to-r from-primary-600 to-light-blue-500 shadow-lg transform -rotate-6 rounded-3xl sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl ${simple ? "hidden" : ""}`}></div>
				<div className="relative px-4 py-10 bg-white shadow-lg rounded-3xl sm:p-20">
					<div className="mx-auto">
						<div>
							<h1 className="text-xl font-semibold text-gray-600 sm:text-2xl">Register</h1>
						</div>
						<div className="divide-y divide-gray-200">
							<form className="register__form mt-8 space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
								<input type="hidden" name="remember" value="true" />
								<div className="space-y-3">
									<div className="register__form-control-field">
										<label htmlFor="name" className="sr-only">
											Name
										</label>
										<input
											id="name"
											name="name"
											type="text"
											required
											className={`register__input appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 ${
												errorMessages.name ? "is-invalid" : ""
											}`}
											placeholder="Name"
											onChange={onChange}
											value={registerData.name}
										/>
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
											className={`register__input appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 ${
												errorMessages.email ? "is-invalid" : ""
											}`}
											placeholder="Email address"
											onChange={onChange}
											value={registerData.email}
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
										<input
											id="password"
											name="password"
											type="password"
											required
											className={`appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 ${
												errorMessages.password ? "is-invalid" : ""
											}`}
											placeholder="Password"
											onChange={onChange}
											value={registerData.password}
										/>
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
											Confirm Password
										</label>
										<input
											id="password_confirmation"
											name="password_confirmation"
											type="password"
											required
											className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
											placeholder="Confirm password"
											onChange={onChange}
											value={registerData.password_confirmation}
										/>
									</div>
								</div>
								{errorMessages.errors && (
									<div className="invalid-feedback">
										{errorMessages.errors.map((error, index) => (
											<p key={index}>{error}</p>
										))}
									</div>
								)}
								<div>
									<button
										type="submit"
										onClick={onRegister}
										className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
									>
										Register
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default RegisterForm;
