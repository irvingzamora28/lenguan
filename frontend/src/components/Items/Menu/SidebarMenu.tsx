import React, { useState } from "react";
import { MdPlayLesson, MdInsertChartOutlined, MdDashboard } from "react-icons/md";
import { GiThorHammer } from "react-icons/gi";
import { BsFillAwardFill } from "react-icons/bs";
import "../../../assets/scss/components/SidebarMenu.scss";
import SubMenu from "./SubMenu";
import { NavLink } from "react-router-dom";

const SidebarMenu: React.FC = () => {
	return (
		<aside className="sidebar absolute min-h-screen md:relative flex w-72 flex-col space-y-2 border-r-2 border-gray-200 bg-backgroundalt p-2 z-10 h-full md:h-auto">
			<NavLink to="/" className={({ isActive }) => `sidebar__navlink ${ isActive ? 'sidebar__navlink--active' : 'sidebar__navlink--inactive' }` } >
				<span className="text-2xl">
					<MdDashboard />
				</span>
				<span>Dashboard</span>
			</NavLink>

			<NavLink to="/lessons" className={({ isActive }) => `sidebar__navlink ${ isActive ? 'sidebar__navlink--active' : 'sidebar__navlink--inactive' }` } >
				<span className="text-2xl">
					<MdPlayLesson />
				</span>
				<span>Lessons</span>
			</NavLink>

			<SubMenu label="Battles and Challenges" icon={<GiThorHammer />}>
				<NavLink to="/gender-duel" className={({ isActive }) => `sidebar__navlink ${ isActive ? 'sidebar__navlink--active' : 'sidebar__navlink--inactive' }` } >
					Gender Duel
				</NavLink>
				<NavLink to="/challenge" className={({ isActive }) => `sidebar__navlink ${ isActive ? 'sidebar__navlink--active' : 'sidebar__navlink--inactive' }` } >
					Challenge 2
				</NavLink>
				<NavLink to="/challenge" className={({ isActive }) => `sidebar__navlink ${ isActive ? 'sidebar__navlink--active' : 'sidebar__navlink--inactive' }` } >
					Challenge 3
				</NavLink>
			</SubMenu>

			<NavLink to="/leaderboard" className={({ isActive }) => `sidebar__navlink ${ isActive ? 'sidebar__navlink--active' : 'sidebar__navlink--inactive' }` } >
				<span className="text-2xl">
					<MdInsertChartOutlined />
				</span>
				<span>Leaderboard</span>
			</NavLink>

			<NavLink to="/awards" className={({ isActive }) => `sidebar__navlink ${ isActive ? 'sidebar__navlink--active' : 'sidebar__navlink--inactive' }` } >
				<span className="text-2xl">
					<BsFillAwardFill />
				</span>
				<span>Awards</span>
			</NavLink>
		</aside>
	);
};

export default SidebarMenu;
