import React, { useState, useEffect, useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import correctSound from "../../../assets/audio/correct-choice.mp3";
import incorrectSound from "../../../assets/audio/incorrect-choice.mp3";
import Layout from "../../Layout/Layout";
import { useFetchVocabularyExercises } from "../../../hooks/fetch/useFetchVocabularyExercises";
import { Link, useParams, useLocation } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import { GrammarExercise } from "../../../types/exercise";

interface Word {
	original: string;
	scrambled: string;
	translation: string;
}

const sampleWords = [
	{ translation: "apple", original: "Apfel" },
	{ translation: "banana", original: "Banane" },
	{ translation: "orange", original: "Orange" },
	{ translation: "grape", original: "Traube" },
	{ translation: "lemon", original: "Zitrone" },
	{ translation: "pear", original: "Birne" },
	{ translation: "cherry", original: "Kirsche" },
	{ translation: "strawberry", original: "Erdbeere" },
	{ translation: "kiwi", original: "Kiwi" },
	{ translation: "melon", original: "Melone" },
];

const ScrambledWordsExercise: React.FC = () => {
	const { lesson_number } = useParams<{ lesson_number: string }>();
	const { t } = useTranslation();
	const locationState = useLocation().state;

	const [vocabularyExerciseDetails, setVocabularyExerciseDetails] = useState(locationState?.exerciseDetails || []);
	const [vocabularyExerciseDetailsError, setVocabularyExerciseDetailsError] = useState<string | null>(null);

	useEffect(() => {
		if (!locationState?.exerciseDetails) {
			console.error("Exercise details not found in location state");
			setVocabularyExerciseDetailsError("No exercise details found");
		}
	}, [locationState]);

	const [state, setState] = useState({
		wordIndex: 0,
		words: [] as Word[],
		availableLetters: [] as string[],
		selectedLetters: [] as string[],
		gameStarted: false,
		showRetryOptions: false,
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

		const isCorrect = currentWord.original === selectedLettersRef.current.join("");

		if (isCorrect) {
			playSound(correctSound);
			const nextWordIndex = state.wordIndex + 1;
			const nextWord = state.words[nextWordIndex];
			if (nextWord) {
				updateState({
					wordIndex: nextWordIndex,
					availableLetters: shuffleLetters(nextWord.original).split(""),
					selectedLetters: [],
					feedback: "Good job!",
				});
			} else {
				// Handle the end of the word list scenario
			}
		} else if (selectedLettersRef.current.length === currentWord.original.length) {
			playSound(incorrectSound);
			updateState({ feedback: "Try again!", showRetryOptions: true });
		} else {
			playSound(incorrectSound);
			updateState({ feedback: "Try again!" });
		}
	}, [state.words, state.wordIndex, playSound]);

	const returnLetter = useCallback((index: number) => {
		setState((prevState) => {
			const newSelectedLetters = [...prevState.selectedLetters];
			const letter = newSelectedLetters.splice(index, 1)[0];

			return {
				...prevState,
				selectedLetters: newSelectedLetters,
				availableLetters: [...prevState.availableLetters, letter],
			};
		});
	}, []);

	const restartWord = useCallback(() => {
		const currentWord = state.words[state.wordIndex];
		updateState({
			availableLetters: shuffleLetters(currentWord.original).split(""),
			selectedLetters: [],
			feedback: "",
			showRetryOptions: false,
		});
	}, [state.wordIndex, state.words]);

	const goToNextWord = useCallback(() => {
		const nextWordIndex = state.wordIndex + 1;
		const nextWord = state.words[nextWordIndex];
		if (nextWord) {
			updateState({
				wordIndex: nextWordIndex,
				availableLetters: shuffleLetters(nextWord.original).split(""),
				selectedLetters: [],
				feedback: "",
				showRetryOptions: false,
			});
		} else {
			// Handle the end of the word list scenario
		}
	}, [state.wordIndex, state.words]);

	// Function to handle letter selection
	const selectLetter = useCallback((letter: string, index: number) => {
		setState((prevState) => {
			const newAvailableLetters = [...prevState.availableLetters];
			newAvailableLetters.splice(index, 1);

			return {
				...prevState,
				availableLetters: newAvailableLetters,
				selectedLetters: [...prevState.selectedLetters, letter],
			};
		});
	}, []);

	useEffect(() => {
		if (state.selectedLetters.length && state.words[state.wordIndex] && state.selectedLetters.length === state.words[state.wordIndex].original.length) {
			checkWord();
		}
	}, [state.selectedLetters, state.words, state.wordIndex, checkWord]);

	useEffect(() => {
		const transformedVocabularyExerciseWords: Word[] = vocabularyExerciseDetails.map((item: { details: GrammarExercise }) => {
			return {
				original: item.details.prompt,
				translation: item.details.answer,
			};
		});

		const loadedWords = transformedVocabularyExerciseWords as unknown as Word[];
		const shuffledWords = loadedWords.map((word) => ({
			...word,
			scrambled: shuffleLetters(word.original),
		}));
		updateState({
			words: shuffledWords,
			availableLetters: shuffledWords[0]?.scrambled.split("") || [],
		});
	}, [vocabularyExerciseDetails]);

	useEffect(() => {
		if (vocabularyExerciseDetailsError) {
			console.error(vocabularyExerciseDetailsError);
		}
	}, [vocabularyExerciseDetailsError]);

	const renderWelcomeScreen = () => (
		<>
			<div className="welcome-section text-center p-4 mb-6 bg-white shadow-md rounded-md">
				<h1 className="welcome-section__title font-bold text-2xl mb-2">Welcome to Scrambled Words!</h1>
				<p className="welcome-section__description mb-4">Click on the letters to form the correct word based on the translation provided.</p>
			</div>
			<div className="back-button-section flex place-content-center sm:place-content-end">
				<Link
					to={`/lessons/${lesson_number}/exercises`}
					className="back-button-section__link flex items-center w-fit border border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white font-bold py-2 px-4 my-2 rounded-lg shadow sm:col-start-3 sm:col-end-4 order-last sm:order-none"
				>
					<MdArrowBack className="back-button-section__icon mr-2" /> Back to exercises
				</Link>
			</div>
			<div className="start-button-section flex flex-col items-center justify-center min-h-[calc(100vh-18rem)] sm:min-h-[calc(100vh-17rem)] bg-gray-100">
				<button
					className="start-button-section__cta items-center mx-auto shadow-box justify-center h-24 w-64 sm:h-20 sm:w-56 drop-shadow-xl rounded-lg px-8 py-4 overflow-hidden group bg-yellow-400 relative hover:bg-gradient-to-r from-yellow-400 to-yellow-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-yellow-400 transition-all ease-out duration-300"
					onClick={() => updateState({ gameStarted: true })}
				>
					<span className="start-button-section__effect absolute right-0 w-12 h-44 -mt-12 sm:w-8 sm:h-32 sm:-mt-8 transition-all duration-1000 transform translate-x-16 bg-white opacity-10 rotate-12 group-hover:-translate-x-72 ease"></span>
					<span className="start-button-section__text relative gender_duel__text-shadow text-4xl sm:text-3xl font-bold">{t("start")}</span>
				</button>
			</div>
		</>
	);

	const renderExerciseScreen = () => {
		const currentWord = state.words[state.wordIndex];
		const letterBoxes = Array.from(currentWord.original).map((_, index) => (
			<div key={index} className="w-10 h-10 border-2 border-gray-300 flex items-center justify-center mx-1 text-2xl sm:w-24 sm:h-24 sm:text-6xl" onClick={() => returnLetter(index)}>
				{state.selectedLetters[index] || ""}
			</div>
		));

		return (
			<div className="grid grid-cols-1 my-8 items-center">
				<h2 className="text-2xl font-bold sm:col-start-1 sm:col-end-3 text-center sm:text-left">Exercises for Lesson {lesson_number}</h2>
				<Link
					to={`/lessons/${lesson_number}/exercises`}
					className="flex items-center w-fit justify-self-center sm:justify-self-end border border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white font-bold py-2 px-4 my-2 rounded-lg shadow sm:col-start-3 sm:col-end-4 order-last sm:order-none"
				>
					<MdArrowBack className="mr-2" /> Back to exercises
				</Link>
				<div className="flex flex-col items-center justify-center h-fit my-10 sm:my-28 bg-gray-100 col-span-3">
					<div className="text-center p-4 mb-6 bg-white shadow-md rounded-md">
						<h2 className="font-bold text-xl mb-2">Original Word</h2>
						<p className="text-gray-700 mb-4 text-2xl sm:text-6xl">{currentWord.translation}</p>
						<div className="mb-4 flex justify-center">{letterBoxes}</div>
					</div>
					<h2 className="font-bold text-xl mb-2">Scrambled Word</h2>
					<div className="flex justify-center space-x-2 mb-4">
						{state.availableLetters.map((letter, index) => (
							<button
								key={index}
								className="w-10 h-10 bg-green-500 text-white font-bold py-3 px-5 text-xl rounded hover:bg-green-700 transition duration-300 sm:w-20 sm:h-20 sm:text-6xl"
								onClick={() => selectLetter(letter, index)}
							>
								{letter}
							</button>
						))}
					</div>
					{state.showRetryOptions && (
						<div className="flex justify-around w-full max-w-md my-4">
							<button className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700 transition duration-300" onClick={restartWord}>
								Restart
							</button>
							<button className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300" onClick={goToNextWord}>
								Next word
							</button>
						</div>
					)}
				</div>
			</div>
		);
	};

	const renderCompletionScreen = () => (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
			<div className="text-center p-4 mb-6 bg-white shadow-md rounded-md">
				<h1 className="font-bold text-2xl mb-2">Congratulations!</h1>
				<p className="mb-4">You have completed the Scrambled Words Exercise.</p>
				<button className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300" onClick={() => updateState({ gameStarted: false, wordIndex: 0, selectedLetters: [] })}>
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
