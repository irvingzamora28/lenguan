import React, { useState, useEffect, useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import correctSound from "../../../assets/audio/correct-choice.mp3";
import incorrectSound from "../../../assets/audio/incorrect-choice.mp3";
import Layout from "../../Layout/Layout";

interface Word {
	original: string;
	scrambled: string;
	translation: string;
}

const sampleWords = [
	{ original: "apple", translation: "Apfel" },
	{ original: "banana", translation: "Banane" },
	{ original: "orange", translation: "Orange" },
	{ original: "grape", translation: "Traube" },
	{ original: "lemon", translation: "Zitrone" },
	{ original: "pear", translation: "Birne" },
	{ original: "cherry", translation: "Kirsche" },
	{ original: "strawberry", translation: "Erdbeere" },
	{ original: "kiwi", translation: "Kiwi" },
	{ original: "melon", translation: "Melone" },
];

const ScrambledWordsExercise: React.FC = () => {
	const { t } = useTranslation();
	const [state, setState] = useState({
		wordIndex: 0,
		words: [] as Word[],
		selectedLetters: [] as string[],
		gameStarted: false,
		feedback: "",
	});
	const selectedLettersRef = useRef<string[]>([]);

	useEffect(() => {
		selectedLettersRef.current = state.selectedLetters;
	}, [state.selectedLetters]);

	const playSound = useCallback((soundEffect: string) => {
		new Audio(soundEffect).play();
	}, []);

	const updateState = useCallback((newState: Partial<typeof state>) => {
		setState((prevState) => ({ ...prevState, ...newState }));
	}, []);

	// Function to shuffle letters of a word
	const shuffleLetters = (word: string): string => {
		const letters = word.split("");
		for (let i = letters.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[letters[i], letters[j]] = [letters[j], letters[i]];
		}
		return letters.join("");
	};

	const checkWord = useCallback(() => {
		const currentWord = state.words[state.wordIndex];
		if (!currentWord) return; // Prevent execution if currentWord is undefined
		console.log(state.words);
		console.log(state.wordIndex);
		const isCorrect = currentWord.original === selectedLettersRef.current.join("");
		console.log(currentWord.original);
		console.log(state.selectedLetters.join(""));

		if (isCorrect) {
			playSound(correctSound);
			updateState({
				wordIndex: state.wordIndex + 1,
				selectedLetters: [],
				feedback: "Good job!",
			});
		} else {
			playSound(incorrectSound);
			updateState({ feedback: "Try again!" });
		}
	}, [state.words, state.wordIndex, playSound]);

	// Function to handle letter selection
	const selectLetter = useCallback((letter: string) => {
		updateState({ selectedLetters: [...selectedLettersRef.current, letter] });
	}, []);

	useEffect(() => {
		if (state.selectedLetters.length && state.words[state.wordIndex] && state.selectedLetters.length === state.words[state.wordIndex].original.length) {
			checkWord();
		}
	}, [state.selectedLetters, state.words, state.wordIndex, checkWord]);

	useEffect(() => {
		// Load words and shuffle them
		const loadedWords = sampleWords as Word[];
		const shuffledWords = loadedWords.map((word) => ({
			...word,
			scrambled: shuffleLetters(word.original),
		}));
		updateState({ words: shuffledWords });
	}, []);

	const renderWelcomeScreen = () => (
		<>
			<div className="text-center p-4 mb-6 bg-white shadow-md rounded-md">
				<h1 className="font-bold text-2xl mb-2">Welcome to Scrambled Words!</h1>
				<p className="mb-4">Click on the letters to form the correct word based on the translation provided.</p>
			</div>
			<div className="flex flex-col items-center justify-center min-h-[calc(100vh-18rem)] sm:min-h-[calc(100vh-17rem)] bg-gray-100">
				<button
					className="items-center mx-auto shadow-box justify-center h-24 w-64 sm:h-20 sm:w-56 drop-shadow-xl rounded-lg px-8 py-4 overflow-hidden group bg-yellow-400 relative hover:bg-gradient-to-r from-yellow-400 to-yellow-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-yellow-400 transition-all ease-out duration-300"
					onClick={() => updateState({ gameStarted: true })}
				>
					<span className="absolute right-0 w-12 h-44 -mt-12 sm:w-8 sm:h-32 sm:-mt-8 transition-all duration-1000 transform translate-x-16 bg-white opacity-10 rotate-12 group-hover:-translate-x-72 ease"></span>
					<span className="relative gender_duel__text-shadow text-4xl sm:text-3xl font-bold">{t("start")}</span>
				</button>
			</div>
		</>
	);

	const renderExerciseScreen = () => {
		const currentWord = state.words[state.wordIndex];

		return (
			<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
				<div className="text-center p-4 mb-6 bg-white shadow-md rounded-md">
					<h2 className="font-bold text-xl mb-2">Scrambled Word</h2>
					<p className="text-gray-700 mb-4">Translation: {currentWord.translation}</p>
					<div className="flex justify-center space-x-2 mb-4">
						{currentWord.scrambled.split("").map((letter, index) => (
							<button key={index} className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-700 transition duration-300" onClick={() => selectLetter(letter)}>
								{letter}
							</button>
						))}
					</div>
					<div className="text-lg font-medium">Selected Letters: {state.selectedLetters.join("")}</div>
				</div>
			</div>
		);
	};

	const renderCompletionScreen = () => (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
			<div className="text-center p-4 mb-6 bg-white shadow-md rounded-md">
				<h1 className="font-bold text-2xl mb-2">Congratulations!</h1>
				<p className="mb-4">You have completed the Scrambled Words Exercise.</p>
				<button
					className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
					onClick={() => updateState({gameStarted: false, wordIndex: 0, selectedLetters: [] })}
				>
					Restart
				</button>
			</div>
		</div>
	);

	return (
		<Layout>
			{!state.gameStarted && renderWelcomeScreen()}
			{state.gameStarted && state.words[state.wordIndex] && renderExerciseScreen()}
			{state.words.length > 0 && state.wordIndex >= state.words.length && renderCompletionScreen()}
		</Layout>
	);
};

export default ScrambledWordsExercise;
