// FlashcardVocabulary.tsx
import React, { useState } from "react";
import { MdTranslate, MdRecordVoiceOver } from "react-icons/md"; // Assuming you're using react-icons

type Gender = "fem" | "masc" | "neut";

interface FlashcardVocabularyProps {
	word: string;
	translation: string;
	exampleSentence: string;
	exampleTranslation: string;
	gender?: Gender;
}

const FlashcardVocabulary: React.FC<FlashcardVocabularyProps> = ({ word, translation, exampleSentence, exampleTranslation, gender }) => {
	const [isFlipped, setIsFlipped] = useState(false);

	const genderColor = {
		fem: "bg-red-100 text-red-700 dark:bg-red-700 dark:text-red-50",
		masc: "bg-blue-100 text-blue-700 dark:bg-blue-700 dark:text-blue-50",
		neut: "bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-50",
	}[gender || "neut"];

	const handleFlip = () => {
		setIsFlipped(!isFlipped);
	};

	return (
		<div
			className={`relative w-full max-w-md mx-auto h-24 shadow-lg rounded-xl hover:shadow-xl cursor-pointer
        ${isFlipped ? "animate-flip-to-back" : "animate-flip-to-front"}
        transition-transform duration-500 ease-in-out transform perspective-1000 overflow-hidden`}
			onClick={handleFlip}
		>
			{/* Front of the card */}
			<div className={`w-full h-full flex flex-col justify-around p-6 items-center text-center ${isFlipped ? "hidden" : ""} ${gender ? genderColor : "bg-slate-100 text-gray-800 dark:bg-slate-700 dark:text-slate-400"}`}>
				<div className="grid grid-cols-[auto_1fr] items-center">
					{/* Empty div for spacing */}
					<div></div>
					<div className="text-lg font-bold">{word}</div>

					{/* Icon and Translation */}
					<MdTranslate className="text-md mr-2" />
					<span className="text-md text-slate-500 dark:text-slate-100">{translation}</span>
				</div>
			</div>

			{/* Back of the card */}
			<div
				className={`w-full h-full flex flex-col justify-around p-6 items-center text-center bg-slate-100 text-gray-800 dark:bg-slate-700 dark:text-slate-400
        ${isFlipped ? "animate-flip-to-back" : "animate-flip-to-front"}
        transition-transform duration-500 ease-in-out transform perspective-1000
        ${isFlipped ? "rotate-y-180" : "rotate-y-0 hidden"}`}
			>
				{/* This div is rotated to make sure the text appears the right way up */}
				<div className={`transform ${isFlipped ? "rotate-y-180" : ""}`}>
					<div className="grid grid-cols-[auto_1fr] items-center">
						{/* Icon and Translation */}
						<MdRecordVoiceOver className="text-md" />
						<span className="text-md">{exampleSentence}</span>
						<div></div>
						<div className="text-md text-slate-500 dark:text-slate-100 italic ml-2">{exampleTranslation}</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FlashcardVocabulary;
