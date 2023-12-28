import React from "react";
import registerImage from "../../../assets/images/register-image.jpg";
import "../../../assets/scss/components/RegisterPage.scss";
import RegisterForm from "../../Items/Forms/RegisterForm";

const RegisterPage: React.FC = () => {
	return (
		<section className="register__section">
			<div className="register__section-content">
				<div>
					<img className="register__image" src={registerImage} alt="Register" />
					<div>
						<h2 className="register__heading">Create your account</h2>
					</div>
				</div>
				<RegisterForm />
			</div>
		</section>
	);
};

export default RegisterPage;
