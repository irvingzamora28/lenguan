import React, { useState, useEffect, useRef } from "react";
import { FiChevronDown, FiMenu } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/authSlice";
import { useLanguages, useSelectedLanguage, useUser } from "../../../redux/hooks";
import { AiOutlineGlobal } from "react-icons/ai";
import { resetLanguageState, setLanguage } from "../../../redux/languageSlice";
import { Language } from "../../../types/language";
import { resetCourseState } from "../../../redux/courseSlice";

interface NavBarProps {
	asideOpen: boolean;
	setAsideOpen: (open: boolean) => void;
	profileOpen: boolean;
	setProfileOpen: (open: boolean) => void;
}

const Navbar: React.FC<NavBarProps> = ({ asideOpen, setAsideOpen, profileOpen, setProfileOpen }) => {
	const dispatch = useDispatch();
	const languages = useLanguages();
	const user = useUser();
	const profileMenuRef = useRef<HTMLDivElement>(null);
	const selectedLanguage = useSelectedLanguage();
	const [languageMenuOpen, setLanguageMenuOpen] = useState(false);

	const handleLogout = (event: React.MouseEvent<HTMLElement>) => {
		dispatch(logout());
		dispatch(resetCourseState());
		dispatch(resetLanguageState());
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
			if (!event.target || !(event.target as HTMLElement).closest(".profile-button")) {
				setProfileOpen(false);
			}
		}
		if (!event.target || !(event.target as HTMLElement).closest(".language-button")) {
			setLanguageMenuOpen(false);
		}
	};

	const handleLanguageChange = (language: Language) => {
		dispatch(setLanguage(language));
		setLanguageMenuOpen(false);
	};

	useEffect(() => {
		document.addEventListener("click", handleClickOutside);
		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, []);

	return (
		<header className="flex w-full items-center justify-between border-b-2 border-gray-200 bg-backgroundalt p-2 fixed z-50">
			<div className="flex items-center space-x-2">
				<button type="button" className="text-3xl" onClick={() => setAsideOpen(!asideOpen)} aria-label="menu">
					<FiMenu />
				</button>
				<div>Logo</div>
			</div>
			<div className="z-10 flex items-center space-x-4">
				{selectedLanguage && (
					<div className="relative">
						<button className="flex items-center space-x-2 bg-primary-500 rounded-full p-2 text-white cursor-pointer language-button" onClick={() => setLanguageMenuOpen(!languageMenuOpen)} aria-label="language">
							<AiOutlineGlobal size={20} />
							<span>{selectedLanguage.code?.toUpperCase()}</span>
							<FiChevronDown size={12} />
						</button>
						{languageMenuOpen && (
							<div className="absolute right-0 mt-1 w-48 divide-y divide-gray-200 rounded-md border border-gray-200 bg-backgroundalt shadow-md">
								{languages &&
									languages.map((language, index) => (
										<div key={index} className="flex items-center space-x-2 p-2 cursor-pointer transition hover:bg-gray-200" onClick={() => handleLanguageChange(language)}>
											<span>{language.name}</span>
										</div>
									))}
							</div>
						)}
					</div>
				)}
				<div className="relative">
					<button type="button" onClick={() => setProfileOpen(!profileOpen)} className="h-9 w-9 overflow-hidden rounded-full profile-button" aria-label="profile">
						<img src="https://picsum.photos/45" alt="plchldr.co" />
					</button>
					{profileOpen && (
						<div ref={profileMenuRef} className="absolute right-0 mt-1 w-48 divide-y divide-gray-200 rounded-md border border-gray-200 bg-backgroundalt shadow-md">
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
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 013-3V7a3 3 0 013-3v1"></path>
									</svg>
									<div>Log Out</div>
								</button>
							</div>
						</div>
					)}
				</div>
			</div>
		</header>
	);
};

export default Navbar;
