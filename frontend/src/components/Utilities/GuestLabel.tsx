// Create here the component for the guest label
import React, { useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { useIsGuest } from "../../redux/hooks";
import Modal from "./Modal";
import RegisterForm from "../Items/Forms/RegisterForm";
import "../../assets/scss/globals.scss";

interface GuestLabelProps {}

interface RegisterData {
	name: string;
	email: string;
	password: string;
	password_confirmation: string;
}

const GuestLabel: React.FC<GuestLabelProps> = ({}) => {
	const isGuest = useIsGuest();
	const [showModal, setShowModal] = useState(false);

	const [registerData, setRegisterData] = useState<RegisterData>({
		name: "",
		email: "",
		password: "",
		password_confirmation: "",
	});

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setRegisterData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	if (isGuest) {
		return (
			<>
				<div className="relative mx-2 self-center cursor-pointer">
					<div onClick={() => setShowModal(true)} className="flex items-center font-medium justify-start p-2 px-4 bg-accent-500 text-white rounded-full" title="You are currently browsing as a guest.">
						<AiOutlineUser className="mr-2" />
						<span className="hidden md:block">Guest Session</span>
						<span className="md:hidden">Guest</span>
					</div>
				</div>
				<Modal show={showModal} onClose={() => setShowModal(false)} title="Register and save your progress" icon={<span className="text-6xl">📖</span>} color="bg-primary-500">
					<RegisterForm />
				</Modal>
			</>
		);
	} else {
		return null;
	}
};

export default GuestLabel;
