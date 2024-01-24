import React, { useState } from "react";
import { MdPlayLesson, MdInsertChartOutlined, MdDashboard } from "react-icons/md";
import { GiThorHammer } from "react-icons/gi";
import { BsFillAwardFill } from "react-icons/bs";
import "../../../assets/scss/components/SidebarMenu.scss";
import SubMenu from "./SubMenu";
import { NavLink } from "react-router-dom";
import GuestLabel from "../../Utilities/GuestLabel";

interface SidebarMenuProps {
	closeSidebar: () => void;
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({ closeSidebar }) => {
	const handleClose = () => {
		closeSidebar();
	};

	return (
		<aside className="sidebar fixed flex w-72 flex-col border-r-2 border-gray-200 bg-backgroundalt dark:bg-blue-900 dark:border-blue-800 dark:text-slate-200 p-2 z-10 h-screen top-[60px]">
			<NavLink to="/" onClick={handleClose} className={({ isActive }) => `sidebar__navlink ${isActive ? "sidebar__navlink--active" : "sidebar__navlink--inactive"}`}>
				<span className="text-2xl">
					<MdDashboard />
				</span>
				<span>Dashboard</span>
			</NavLink>

			<NavLink to="/lessons" onClick={handleClose} className={({ isActive }) => `sidebar__navlink ${isActive ? "sidebar__navlink--active" : "sidebar__navlink--inactive"}`}>
				<span className="text-2xl">
					<MdPlayLesson />
				</span>
				<span>Lessons</span>
			</NavLink>

			<SubMenu label="Battles and Challenges" icon={<GiThorHammer />}>
				<NavLink to="/gender-duel" onClick={handleClose} className={({ isActive }) => `sidebar__navlink ${isActive ? "sidebar__navlink--active" : "sidebar__navlink--inactive"}`}>
					Gender Duel
				</NavLink>
			</SubMenu>

			{/* <NavLink to="/leaderboard" onClick={handleClose} className={({ isActive }) => `sidebar__navlink ${isActive ? "sidebar__navlink--active" : "sidebar__navlink--inactive"}`}>
				<span className="text-2xl">
					<MdInsertChartOutlined />
				</span>
				<span>Leaderboard</span>
			</NavLink>

			<NavLink to="/awards" onClick={handleClose} className={({ isActive }) => `sidebar__navlink ${isActive ? "sidebar__navlink--active" : "sidebar__navlink--inactive"}`}>
				<span className="text-2xl">
					<BsFillAwardFill />
				</span>
				<span>Awards</span>
			</NavLink> */}
			<GuestLabel />
		</aside>
	);
};

export default SidebarMenu;
