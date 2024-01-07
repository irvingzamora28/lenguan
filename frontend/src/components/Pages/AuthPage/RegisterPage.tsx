import React from "react";
import registerImage from "../../../assets/images/register-image.png";
import "../../../assets/scss/components/RegisterPage.scss";
import RegisterForm from "../../Items/Forms/RegisterForm";
import useUserRegister from "../../../hooks/useUserRegister";
import { Link } from "react-router-dom";

const RegisterPage: React.FC = () => {
	const { errorMessages, registerData, handleChange, registerResponse, handleRegister } = useUserRegister("/login");

	return (
		<>
			<header className="flex flex-wrap justify-between items-center p-6 md:flex-row">
				<Link to="/" className="flex items-center">
					<h1 className="text-2xl font-bold mb-2 md:mb-0 text-primary-800">Lenguan</h1>
				</Link>

				<div className="flex space-x-4">
					<Link to="/login" className="bg-primary-500 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded">
						Log in
					</Link>
				</div>
			</header>
			<section className="register__section">
				<div className="register__section-content">
					<div className="md:flex">
						<div className="flex md:w-1/2 justify-center items-center">
							<div className="flex justify-center md:block">
								<img className="register__image rounded-full md:rounded-lg shadow-lg max-w-xs lg:max-w-md" src={registerImage} alt="Register" />
							</div>
						</div>

						<div className="md:w-1/2">
							<h2 className="register__heading">Create your account</h2>
							<RegisterForm onRegister={handleRegister} onChange={handleChange} registerResponse={registerResponse} registerData={registerData} errorMessages={errorMessages} />
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default RegisterPage;
