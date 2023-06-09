import React, { useState, useEffect, useRef } from "react";
import { FiMenu } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/authSlice";
import { useUser } from "../../../redux/hooks";

interface NavBarProps {
	asideOpen: boolean;
	setAsideOpen: (open: boolean) => void;
	profileOpen: boolean;
	setProfileOpen: (open: boolean) => void;
}

const Navbar: React.FC<NavBarProps> = ({ asideOpen, setAsideOpen, profileOpen, setProfileOpen }) => {
	const dispatch = useDispatch();
	const user = useUser();
	const profileMenuRef = useRef<HTMLDivElement>(null);

	const handleLogout = (event: React.MouseEvent<HTMLElement>) => {
		dispatch(logout());
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
			if (!event.target || !(event.target as HTMLElement).closest(".profile-button")) {
				setProfileOpen(false);
			}
		}
	};

	useEffect(() => {
		document.addEventListener("click", handleClickOutside);
		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, []);

	return (
		<header className="flex w-full items-center justify-between border-b-2 border-gray-200 bg-backgroundalt p-2">
			<div className="flex items-center space-x-2">
				<button type="button" className="text-3xl" onClick={() => setAsideOpen(!asideOpen)}>
					<FiMenu />
				</button>
				<div>Logo</div>
			</div>
			<div className="z-10">
				<button type="button" onClick={() => setProfileOpen(!profileOpen)} className="h-9 w-9 overflow-hidden rounded-full profile-button">
					<img src="https://picsum.photos/45" alt="plchldr.co" />
				</button>
				{profileOpen && (
					<div ref={profileMenuRef} className="absolute right-2 mt-1 w-48 divide-y divide-gray-200 rounded-md border border-gray-200 bg-backgroundalt shadow-md">
						<div className="flex items-center space-x-2 p-2">
							<img src="https://picsum.photos/45" alt="plchldr.co" className="h-9 w-9 rounded-full" />
							<div className="font-medium">{user?.name}</div>
						</div>
						<div className="flex flex-col space-y-3 p-2">
							<a href="#" className="transition hover:text-primary-600">
								My Profile
							</a>
							<a href="#" className="transition hover:text-primary-600">
								Edit Profile
							</a>
							<a href="#" className="transition hover:text-primary-600">
								Settings
							</a>
						</div>
						<div className="p-2">
							<button className="flex items-center space-x-2 transition hover:text-primary-600" onClick={handleLogout}>
								<svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
								</svg>
								<div>Log Out</div>
							</button>
						</div>
					</div>
				)}
			</div>
		</header>
	);
};

export default Navbar;
