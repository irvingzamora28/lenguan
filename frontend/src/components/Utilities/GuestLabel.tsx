import React, { useState } from "react";
import { createPortal } from "react-dom";
import { AiOutlineUser } from "react-icons/ai";
import { useIsGuest } from "../../redux/hooks";
import Modal from "./Modal";
import RegisterForm from "../Items/Forms/RegisterForm";
import "../../assets/scss/globals.scss";
import useUserRegister from "../../hooks/useUserRegister";

interface GuestLabelProps {}

const GuestLabel: React.FC<GuestLabelProps> = ({}) => {
	const { errorMessages, registerData, handleChange, registerResponse, handleRegister } = useUserRegister("/login");
	const isGuest = useIsGuest();
	const [showModal, setShowModal] = useState(false);

	if (isGuest) {
		return (
			<>
				<div className="relative mx-2 self-center cursor-pointer">
					<div onClick={() => setShowModal(true)} className="flex items-center font-medium justify-start p-2 px-4 bg-accent-500 text-white rounded-full" title="You are currently browsing as a guest.">
						<AiOutlineUser className="mr-2" />
						<span className="hidden md:block">Guest Register</span>
						<span className="md:hidden">Register</span>
					</div>
				</div>
				{createPortal(
					<Modal show={showModal} onClose={() => setShowModal(false)} title="Register and save your progress" icon={<span className="text-6xl">📖</span>} color="bg-primary-500">
						<RegisterForm onRegister={handleRegister} onChange={handleChange} registerResponse={registerResponse} registerData={registerData} errorMessages={errorMessages} simple={true} />
					</Modal>,
					document.body
				)}
			</>
		);
	} else {
		return null;
	}
};

export default GuestLabel;
