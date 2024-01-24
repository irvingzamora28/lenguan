import React from "react";
import { MdTurnLeft } from "react-icons/md";
import { NavLink } from "react-router-dom";

interface ButtonGoBackProps {}

const ButtonGoBack: React.FC<ButtonGoBackProps> = () => {
	return (
		<NavLink
			to="/"
			className="flex items-center justify-center h-12 w-48 rounded-lg drop-shadow-xl my-8 px-8 py-2 overflow-hidden group bg-red-500 relative shadow-lg hover:shadow-2xl hover:bg-red-600 transition duration-300 ease-in-out"
		>
			<span className="relative flex text-red-50 text-2xl font-bold">
				Go back
				<MdTurnLeft />
			</span>
		</NavLink>
	);
};

export default ButtonGoBack;
