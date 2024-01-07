import React from "react";
import registerImage from "../../../assets/images/register-image.jpg";
import "../../../assets/scss/components/RegisterPage.scss";
import RegisterForm from "../../Items/Forms/RegisterForm";
import useUserRegister from "../../../hooks/useUserRegister";

const RegisterPage: React.FC = () => {
	const { errorMessages, registerData, handleChange, registerResponse, handleRegister } = useUserRegister("/login");

	return (
		<section className="register__section">
			<div className="register__section-content">
				<div>
					<img className="register__image" src={registerImage} alt="Register" />
					<div>
						<h2 className="register__heading">Create your account</h2>
					</div>
				</div>
				<RegisterForm onRegister={handleRegister} onChange={handleChange} registerResponse={registerResponse} registerData={registerData} errorMessages={errorMessages} />
			</div>
		</section>
	);
};

export default RegisterPage;
