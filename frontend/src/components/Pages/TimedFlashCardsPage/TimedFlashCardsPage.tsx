import React, { useState, useEffect, useRef } from "react";
import Layout from "../../Layout/Layout";
import correctSound from "../../../assets/audio/correct-choice.mp3";
import incorrectSound from "../../../assets/audio/incorrect-choice.mp3";

interface Flashcard {
	word: string; // word in user's language
	translation: string; // correct translation in the target language
}

type Difficulty = "easy" | "medium" | "hard";

const difficultyLevels: Record<Difficulty, number> = {
	easy: 15,
	medium: 10,
	hard: 5,
};

const flashcardsData: Flashcard[] = [
	{
		word: "House",
		translation: "Haus",
	},
	{
		word: "Cat",
		translation: "Katze",
	},
	{
		word: "Tree",
		translation: "Baum",
	},
	{
		word: "Book",
		translation: "Buch",
	},
	{
		word: "Love",
		translation: "Liebe",
	},
	{
		word: "Water",
		translation: "Wasser",
	},
	{
		word: "Fire",
		translation: "Feuer",
	},
	{
		word: "Sun",
		translation: "Sonne",
	},
	{
		word: "Moon",
		translation: "Mond",
	},
	{
		word: "Star",
		translation: "Stern",
	},
];

const TimedFlashcards: React.FC = () => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [currentFlashcard, setCurrentFlashcard] = useState<Flashcard | null>(null);
	const [userInput, setUserInput] = useState("");
	const [timer, setTimer] = useState<number>(10); // default 10 seconds, can be set by user
	const [score, setScore] = useState(0);
	const [gameStarted, setGameStarted] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);
	const [isIncorrect, setIsIncorrect] = useState(false);
	const [difficulty, setDifficulty] = useState<Difficulty>("medium");
	const [selectedTime, setSelectedTime] = useState<number>(difficultyLevels.medium);

	// When the start button is clicked, initialize the game with the selected difficulty
	const startGame = () => {
		setTimer(selectedTime);
		setGameStarted(true);
	};

	// Update the selected time when difficulty changes
	useEffect(() => {
		setSelectedTime(difficultyLevels[difficulty]);
	}, [difficulty]);

	useEffect(() => {
		setCurrentFlashcard(flashcardsData[currentIndex]);
	}, [currentIndex]);

	useEffect(() => {
		if (gameStarted) {
			const timerId = setInterval(() => {
				setTimer((prevTimer) => {
					if (prevTimer === 1) {
						clearInterval(timerId);
						return 0; // reset timer
					}
					return prevTimer - 1;
				});
			}, 1000);
			return () => clearInterval(timerId);
		}
	}, [gameStarted, currentIndex]);

	useEffect(() => {
		if (timer === 0) {
			setUserInput("");
			setCurrentIndex((prevIndex) => prevIndex + 1);
			setTimer(selectedTime);
			setIsIncorrect(false); // Reset the incorrect flag
		}
	}, [timer]);

	const playSound = (sound: string) => {
		const audio = new Audio(sound);
		audio.play();
	};

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setUserInput(event.target.value);
	};

	const handleSubmit = () => {
		// Check if the input matches the correct translation
		if (userInput.trim().toLowerCase() === currentFlashcard?.translation.toLowerCase()) {
			setScore((prevScore) => prevScore + 1); // Increment score for correct answer
			setUserInput(""); // Reset input field
			setCurrentIndex((prevIndex) => prevIndex + 1); // Move to next flashcard
			setTimer(10); // Reset timer to initial value
			playSound(correctSound);
			setIsIncorrect(false); // Reset the incorrect flag
			setTimer(selectedTime);
		} else {
			// If the answer is incorrect, just clear the input field and let the user try again
			setUserInput("");
			playSound(incorrectSound);
			setIsIncorrect(true);
			setTimeout(() => setIsIncorrect(false), 820); // Duration of the shake animation
		}
	};
	useEffect(() => {
		let shakeTimeout: NodeJS.Timeout;

		return () => {
			clearTimeout(shakeTimeout);
		};
	}, []);

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			handleSubmit();
		}
	};

	return (
		<Layout>
			<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
				{!gameStarted ? (
					<div className="flex flex-col items-center">
						{/* Difficulty selection */}
						<div className="mb-4">
							<label htmlFor="difficulty" className="block text-xl font-medium text-gray-700">
								Choose difficulty:
							</label>
							<select
								id="difficulty"
								value={difficulty}
								onChange={(e) => setDifficulty(e.target.value as Difficulty)}
								className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
							>
								<option value="easy">Easy (15 seconds)</option>
								<option value="medium">Medium (10 seconds)</option>
								<option value="hard">Hard (5 seconds)</option>
							</select>
						</div>
						{/* Start button */}
						<button
							className="items-center mx-auto shadow-box justify-center h-24 w-64 drop-shadow-xl rounded-lg px-8 py-4 overflow-hidden group bg-yellow-400 relative hover:bg-gradient-to-r hover:from-yellow-400 hover:to-yellow-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-yellow-400 transition-all ease-out duration-300"
							onClick={startGame}
						>
							<span className="absolute right-0 w-12 h-44 -mt-12 transition-all duration-1000 transform translate-x-16 bg-white opacity-10 rotate-12 group-hover:-translate-x-72 ease"></span>
							<span className="relative gender_duel__text-shadow text-4xl font-bold">START</span>
						</button>
					</div>
				) : (
					<>
						{currentFlashcard ? (
							<div className="flex flex-col items-center">
								<h1 className="text-3xl font-bold mb-8 text-center">Translate the word</h1>
								<div className={`shadow-xl rounded-lg p-8 mb-8 flex items-center justify-center w-full h-40 ${isIncorrect ? "animate-incorrect bg-red-200" : "bg-white"}`}>
									<p className="text-2xl font-semibold text-center md:text-5xl">{currentFlashcard.word}</p>
								</div>
								<input
									ref={inputRef}
									type="text"
									value={userInput}
									onChange={handleInputChange}
									onKeyDown={handleKeyDown}
									className={`border p-4 w-full max-w-lg rounded-lg text-center text-2xl mb-2`}
									placeholder="Type the translation"
									autoFocus
								/>
								<button onClick={handleSubmit} className="bg-blue-500 text-white p-3 rounded-lg text-xl mb-6">
									Submit
								</button>
								<div className="text-center">
									<p className="text-xl">Time left: {timer}s</p>
									<p className="text-xl">Score: {score}</p>
								</div>
							</div>
						) : (
							<p className="text-2xl font-bold">No more flashcards!</p>
						)}
					</>
				)}
			</div>
		</Layout>
	);
};

export default TimedFlashcards;
