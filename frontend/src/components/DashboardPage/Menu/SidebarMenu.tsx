import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import SubMenu from "./SubMenu";

const SidebarMenu: React.FC = () => {
	const [profileSubMenuOpen, setProfileSubMenuOpen] = useState(false);

	return (
		<aside className="sidebar flex w-72 flex-col space-y-2 border-r-2 border-gray-200 bg-white p-2" style={{ height: "90.5vh" }}>
			<a href="#" className="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600">
				<span className="text-2xl">
					<i className="bx bx-home"></i>
				</span>
				<span>Dashboard</span>
			</a>

			<a href="#" className="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600">
				<span className="text-2xl">
					<i className="bx bx-cart"></i>
				</span>
				<span>Cart</span>
			</a>

			<SubMenu label="Shopping" icon={<i className="bx bx-shopping-bag"></i>}>
				<a href="#" className="transition hover:text-blue-600 text-sm p-2">
					Category 1
				</a>
				<a href="#" className="transition hover:text-blue-600 text-sm p-2">
					Category 2
				</a>
				<a href="#" className="transition hover:text-blue-600 text-sm p-2">
					Category 3
				</a>
			</SubMenu>

			<a href="#" className="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600">
				<span className="text-2xl">
					<i className="bx bx-heart"></i>
				</span>
				<span>My Favourite</span>
			</a>

			<SubMenu label="Profile" icon={<i className="bx bx-user"></i>}>
				<a href="#" className="transition hover:text-blue-600 text-sm p-2">
					My Items
				</a>
				<a href="#" className="transition hover:text-blue-600 text-sm p-2">
					My Pictures
				</a>
				<a href="#" className="transition hover:text-blue-600 text-sm p-2">
					My Collection
				</a>
			</SubMenu>
		</aside>
	);
};

export default SidebarMenu;
