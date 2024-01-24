import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const SubMenu: React.FC<{
	label: string;
	icon: JSX.Element;
	children: React.ReactNode;
}> = ({ label, icon, children }) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div>
			<button onClick={() => setIsOpen(!isOpen)} className="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-background dark:hover:bg-darkbackground hover:text-primary-600 w-full justify-between">
				<div className="flex items-center space-x-1">
					<span className="text-2xl">{icon}</span>
					<span>{label}</span>
				</div>
				{isOpen ? <FiChevronUp className="text-xl mr-1" /> : <FiChevronDown className="text-xl mr-1" />}
			</button>
			{isOpen && <div className="flex flex-col space-y-1 ml-6">{children}</div>}
		</div>
	);
};

export default SubMenu;
