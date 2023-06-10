import React, { useRef } from "react";

interface GameLoginFormProps {
	handleLogin: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	handleEnterAsGuest: () => void;
}

const GameLoginForm: React.FC<GameLoginFormProps> = ({ handleLogin, handleEnterAsGuest }) => {
	const usernameInput = useRef<HTMLInputElement>(null);
	const passwordInput = useRef<HTMLInputElement>(null);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
	};

	return (
		<div className="flex flex-col items-center">
			<h2 className="text-2xl font-bold mb-4 text-white">Enter your username and password or join as a guest</h2>
			<form className="flex flex-col items-center mb-4" onSubmit={handleSubmit}>
				<label className="text-white mb-2" htmlFor="usernameInput">
					Username
				</label>
				<input id="usernameInput" type="text" ref={usernameInput} placeholder="Username" className="w-full p-2 mb-2 text-black border-2 border-white rounded-md focus:outline-none focus:border-yellow-400" />
				<label className="text-white mb-2" htmlFor="passwordInput">
					Password
				</label>
				<input id="passwordInput" type="password" ref={passwordInput} placeholder="Password" className="w-full p-2 mb-2 text-black border-2 border-white rounded-md focus:outline-none focus:border-yellow-400" />
				<button
					type="submit"
					className="bg-red-500 text-white font-semibold px-6 py-2 rounded-lg hover:bg-red-600 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 transition-all ease-out duration-300"
					onClick={handleLogin}
				>
					Login
				</button>
			</form>
			<button
				onClick={handleEnterAsGuest}
				className="bg-red-500 text-white font-semibold px-6 py-2 rounded-lg hover:bg-red-600 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 hover:bg-gradient-to-r hover:from-red-400 hover:to-red-400 hover:ring-2 hover:ring-offset-2 hover:ring-red-400 transition-all ease-out duration-300"
			>
				<span className="absolute right-0 w-12 h-44 -mt-12 transition-all duration-1000 transform translate-x-16 bg-white opacity-10 rotate-12 group-hover:-translate-x-72 ease"></span>
				<span className="relative gender_duel__text-shadow text-xl font-bold">Enter as a guest</span>
			</button>
		</div>
	);
};

export default GameLoginForm;
