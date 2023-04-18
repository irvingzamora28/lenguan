import React, { useEffect, useState } from "react";
import registerImage from "../../assets/images/register-image.jpg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import "../../assets/scss/components/RegisterPage.scss";
import { refreshCsrfToken } from "../../utils/csrf-token";
import api from "../../utils/api";


interface RegisterData {
	name: string;
	email: string;
	password: string;
	password_confirmation: string;
}

const RegisterPage: React.FC = () => {
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
			const response = await api.post("/api/register", registerData);
            // Check response if it has a message, if it does toast.success the message
            if (response.data.message) {
                toast.success(response.data.message, {
                    position: 'top-right'
                  });
            }
		} catch (error: any) {
			if (error.response) {
				const { data } = error.response;
				const errorFields = Object.keys(data.errors);
				let errorMessageLines: string[] = [];
				errorFields.forEach((field) => {
					errorMessageLines.push(`${data.errors[field][0]}`);
				});
				setErrorMessage(errorMessageLines);
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
		<section className="register__section">
        <ToastContainer />
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
