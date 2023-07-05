import React, { useState } from "react";
import { MdPlayLesson, MdInsertChartOutlined, MdDashboard } from "react-icons/md";
import { GiThorHammer } from "react-icons/gi";
import { BsFillAwardFill } from "react-icons/bs";
import SubMenu from "./SubMenu";

const SidebarMenu: React.FC = () => {
	return (
		<aside className="sidebar absolute md:relative flex w-72 flex-col space-y-2 border-r-2 border-gray-200 bg-backgroundalt p-2 z-10 h-full md:h-auto">
			<a href="#" className="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-background hover:text-primary-600">
				<span className="text-2xl">
					<MdDashboard />
				</span>
				<span>Dashboard</span>
			</a>

			<a href="lessons" className="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-background hover:text-primary-600">
				<span className="text-2xl">
					<MdPlayLesson />
				</span>
				<span>Lessons</span>
			</a>

			<SubMenu label="Battles and Challenges" icon={<GiThorHammer />}>
				<a href="#" className="transition hover:text-primary-600 text-sm p-2">
					Challenge 1
				</a>
				<a href="#" className="transition hover:text-primary-600 text-sm p-2">
					Challenge 2
				</a>
				<a href="#" className="transition hover:text-primary-600 text-sm p-2">
					Challenge 3
				</a>
			</SubMenu>

			<a href="#" className="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-background hover:text-primary-600">
				<span className="text-2xl">
					<MdInsertChartOutlined />
				</span>
				<span>Leaderboard</span>
			</a>

			<a href="#" className="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-background hover:text-primary-600">
				<span className="text-2xl">
					<BsFillAwardFill />
				</span>
				<span>Awards</span>
			</a>
		</aside>
	);
};

export default SidebarMenu;
