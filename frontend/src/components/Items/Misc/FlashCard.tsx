import React, { useEffect, useState, useRef } from "react";

type FlashCardProps = {
	word: string;
	translation: string;
	audioUrl: string;
	imageUrl: string;
};

const FlashCard: React.FC<FlashCardProps> = ({ word, translation, audioUrl, imageUrl }) => {
	const [flipped, setFlipped] = useState(false);
	const audioRef = useRef<HTMLAudioElement>(null);

	const toggleFlip = () => {
		setFlipped(!flipped);
	};

	useEffect(() => {
		if (flipped && audioRef.current) {
			audioRef.current.play();
		}
	}, [flipped]);

	return (
		<div
			className={`relative max-w-sm mx-auto h-96 shadow-lg rounded-lg hover:shadow-xl cursor-pointer
              ${flipped ? "animate-flip-to-back" : "animate-flip-to-front"}
              transition-transform duration-500 ease-in-out transform perspective-1000 overflow-hidden`}
			onClick={toggleFlip}
		>
			{/* Front of the card */}
			<div className={`w-full h-full flex flex-col justify-between ${flipped ? "hidden" : ""}`}>
				<img className="flex-grow w-full h-full object-cover rounded-t-lg" src={imageUrl} alt={word} />
			</div>

			{/* Back of the card */}
			<div
				className={`w-full h-full flex flex-col justify-between
              ${flipped ? "animate-flip-to-back" : "animate-flip-to-front"}
              transition-transform duration-500 ease-in-out transform perspective-1000
              ${flipped ? "rotate-y-180" : "rotate-y-0 hidden"}`}
			>
				<div className={`h-full transform ${flipped ? "rotate-y-180" : ""}`}>
					<div className="flex flex-col h-full">
						<div className="flex-grow flex justify-center items-center text-center p-4 bg-gray-200">
							<span className="font-bold text-4xl">{word}</span>
						</div>
						<div className="flex-shrink-0 px-6 py-4">
							<div className="font-bold text-xl text-center">{translation}</div>
							<audio ref={audioRef} src={audioUrl} controls>
								Your browser does not support the audio element.
							</audio>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FlashCard;
