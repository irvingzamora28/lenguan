// src/components/Layout/Layout.tsx
import React, { useState } from "react";
import Navbar from "../Items/Navbar/Navbar";
import SidebarMenu from "../Items/Menu/SidebarMenu";

interface LayoutProps {
	children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	const [profileOpen, setProfileOpen] = useState(false);
	const [asideOpen, setAsideOpen] = useState(true);

	return (
		<main className="min-h-screen w-full bg-gray-100 text-gray-700">
			<Navbar asideOpen={asideOpen} setAsideOpen={setAsideOpen} profileOpen={profileOpen} setProfileOpen={setProfileOpen} />
			<div className="flex">
				{asideOpen && <SidebarMenu />}
				<div className="container mx-auto px-4 py-8 max-h-screen md:max-h-none overflow-y-auto">{children}</div>
			</div>
		</main>
	);
};

export default Layout;
