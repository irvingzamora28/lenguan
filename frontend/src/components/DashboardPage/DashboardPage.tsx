import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";
import SidebarMenu from "./Menu/SidebarMenu";
import Navbar from "./Navbar/Navbar";

const DashboardPage: React.FC = () => {
	const [profileOpen, setProfileOpen] = useState(false);
	const [asideOpen, setAsideOpen] = useState(true);

	return (
		<main className="min-h-screen w-full bg-gray-100 text-gray-700">
			<Navbar asideOpen={asideOpen} setAsideOpen={setAsideOpen} profileOpen={profileOpen} setProfileOpen={setProfileOpen} />
			<div className="flex">
				{asideOpen && <SidebarMenu />}
				<div className="w-full p-4">
					Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita quam odit officiis magni doloribus ipsa dolore, dolores nihil accusantium labore, incidunt autem iure quae vitae voluptate, esse asperiores aliquam
					repellat. Harum aliquid non officiis porro at cumque eaque inventore iure. Modi sunt optio mollitia repellat sed ab quibusdam quos harum!
				</div>
			</div>
		</main>
	);
};

export default DashboardPage;
