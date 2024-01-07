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
				<div className="md:flex">
					<div className="flex md:w-1/2 md:pr-8 justify-center items-center">
						<div className="flex justify-center md:block">
							<img className="register__image rounded-lg shadow-lg max-w-xs lg:max-w-md" src={registerImage} alt="Register" />
						</div>
					</div>

					<div className="md:w-1/2">
						<h2 className="register__heading">Create your account</h2>
						<RegisterForm onRegister={handleRegister} onChange={handleChange} registerResponse={registerResponse} registerData={registerData} errorMessages={errorMessages} />
					</div>
				</div>
			</div>
		</section>
	);
};

export default RegisterPage;
