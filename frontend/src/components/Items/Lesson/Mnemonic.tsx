import React, { useState } from "react";

type MnemonicProps = {
	title: string;
	content: string;
};

const Mnemonic: React.FC<MnemonicProps> = ({ title, content }) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="mb-4 relative">
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="flex w-full justify-between items-center px-5 py-3 font-medium text-left text-white bg-gradient-to-r from-teal-500 to-cyan-600 rounded-lg hover:from-teal-600 hover:to-cyan-700 focus:outline-none focus-visible:ring focus-visible:ring-teal-300 focus-visible:ring-opacity-75 shadow-lg transition duration-300 ease-in-out transform hover:scale-105 space-x-2 md:w-auto md:whitespace-nowrap"
			>
				<span className="text-sm md:text-base">{title}</span>
				<span className="text-2xl">🧠</span>
			</button>
			{isOpen && (
				<div className="absolute z-10 text-gray-700 p-4 border rounded-lg border-gray-200 bg-white shadow w-full md:w-auto mt-1">
					<p className="text-sm md:text-base">{content}</p>
				</div>
			)}
		</div>
	);
};

export default Mnemonic;
