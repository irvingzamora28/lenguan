import React, { useState, useCallback, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { MdArrowBack, MdCheck, MdArrowForward } from "react-icons/md";
import Layout from "../../Layout/Layout";
import { useTranslation } from "react-i18next";
import SpecialCharacterInput from "../../Items/Misc/SpecialCharacterInput";
import { GrammarExercise, SentenceExercise } from "../../../types/exercise";
import { useUser } from "../../../redux/hooks";
import { useFetchGrammarExercises } from "../../../hooks/fetch/useFetchGrammarExercises";
import SentenceErrorHighlight from "../../Items/Exercises/SentenceErrorHighlight";
import Modal from "../../Utilities/Modal";

interface State {
	currentSentenceIndex: number;
	userAnswer: string;
	feedback: string;
	showExplanation: boolean;
	gameStarted: boolean;
	isCorrect: boolean;
}

const SentenceCorrectionExercise: React.FC = () => {
	const { lesson_number } = useParams<{ lesson_number: string }>();
	const { t } = useTranslation();
	const inputRef = useRef<HTMLInputElement>(null);
	const locationState = useLocation().state;
	const [showModal, setShowModal] = useState(false);
	const navigate = useNavigate();
	const user = useUser();
	const shouldFetchGrammarExercises = !locationState?.exerciseDetails;
	const [grammarExerciseDetails, setGrammarExerciseDetails] = useState(locationState?.exerciseDetails || []);
	const [grammarExercises, grammarExercisesError] = useFetchGrammarExercises(user?.course?._id ?? "", lesson_number ?? "", shouldFetchGrammarExercises);
	const [grammarExerciseSentences, setGrammarExerciseSentences] = useState<GrammarExercise[]>([]);
	const [showErrorHighlight, setShowErrorHighlight] = useState(false);

	const toggleErrorHighlight = () => {
		setShowErrorHighlight(!showErrorHighlight);
	};

	useEffect(() => {
		if (!shouldFetchGrammarExercises) {
			setGrammarExerciseDetails(locationState.exerciseDetails);
		} else if (grammarExercisesError) {
			console.error("Error fetching vocabulary exercises:", grammarExercisesError);
		} else {
			setGrammarExerciseDetails(
				grammarExercises.map((word) => ({
					details: {
						prompt: word.prompt,
						answer: word.answer,
						explanation: word.explanation,
					},
				}))
			);
		}
	}, [grammarExercises, grammarExercisesError, shouldFetchGrammarExercises, locationState]);

	useEffect(() => {
		const grammarExerciseSentences: GrammarExercise[] = grammarExerciseDetails.map((item: { details: GrammarExercise }) => {
			return {
				prompt: item.details.prompt,
				answer: item.details.answer,
				explanation: item.details.explanation,
			};
		});

		setGrammarExerciseSentences(grammarExerciseSentences);
	}, [grammarExerciseDetails]);

	const [state, setState] = useState<State>({
		currentSentenceIndex: 0,
		userAnswer: "",
		feedback: "",
		showExplanation: false,
		gameStarted: false,
		isCorrect: false,
	});

	const updateState = useCallback((newState: Partial<State>) => {
		setState((prevState) => ({ ...prevState, ...newState }));
	}, []);

	const handleCheckAnswer = () => {
		const isCorrect = state.userAnswer.trim() === grammarExerciseSentences[state.currentSentenceIndex].answer;
		updateState({ feedback: isCorrect ? "Correct!" : "Incorrect, try again.", showExplanation: !isCorrect && state.userAnswer !== "", isCorrect: isCorrect });

		if (isCorrect) {
			handleNextSentence();
			setShowErrorHighlight(false);
		}
	};

	const handleNextSentence = () => {
		if (state.userAnswer.trim() === "") {
			updateState({ feedback: "Please enter an answer." });
			return;
		}

		const nextIndex = state.currentSentenceIndex + 1;
		if (nextIndex < grammarExerciseSentences.length) {
			updateState({
				currentSentenceIndex: nextIndex,
				userAnswer: "",
				feedback: "",
				showExplanation: false,
			});
		} else {
			setShowModal(true);
		}
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			handleCheckAnswer();
		}
	};

	useEffect(() => {
		if (state.gameStarted && state.currentSentenceIndex < grammarExerciseSentences.length && inputRef.current) {
			inputRef.current.focus();
		}
	}, [state.gameStarted, state.currentSentenceIndex, grammarExerciseSentences.length]);

	const onCloseModal = () => {
		setShowModal(false);
		navigate(`/lessons/${lesson_number}/exercises`);
	};

	const renderWelcomeScreen = () => (
		<div className="container mx-auto px-4 py-16 ">
			<div className="welcome-section text-center p-4 mb-6 bg-white shadow-md rounded-md">
				<h1 className="welcome-section__title font-bold text-2xl mb-2">Welcome to Sentence Correction!</h1>
				<p className="welcome-section__description mb-4">Correct the grammatical errors in each sentence.</p>
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
		</div>
	);

	const renderExerciseScreen = () => (
		<div className="grid grid-cols-1 my-8 items-center">
			<h2 className="text-2xl font-bold text-center sm:text-left mb-4">Sentence Correction Exercises for Lesson {lesson_number}</h2>
			<Link
				to={`/lessons/${lesson_number}/exercises`}
				className="back-button-section__link flex items-center w-fit border border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white font-bold py-2 px-4 my-2 rounded-lg shadow sm:col-start-3 sm:col-end-4 order-last sm:order-none"
			>
				<MdArrowBack className="back-button-section__icon mr-2" /> Back to exercises
			</Link>
			<div className="flex flex-col items-center justify-center h-fit my-10 sm:my-28 bg-gray-100 col-span-3">
				<div className="bg-white shadow-lg rounded-lg p-6 w-full">
					<h3 className="text-xl font-bold mb-4">Correct the sentence</h3>
					<p className="mb-4 text-gray-700 text-lg">{grammarExerciseSentences[state.currentSentenceIndex].prompt}</p>

					<input
						ref={inputRef}
						type="text"
						autoComplete="off"
						className="border border-gray-300 p-3 rounded-md w-full mb-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
						value={state.userAnswer}
						onChange={(e) => updateState({ userAnswer: e.target.value })}
						onKeyDown={handleKeyDown}
					/>
					<SpecialCharacterInput specialCharacters={user?.course?.language.special_characters ?? []} inputValue={state.userAnswer} setInputValue={(value: string) => updateState({ userAnswer: value })} inputRef={inputRef} />

					<div className={`flex items-center mt-4 ${state.feedback && !state.isCorrect ? "justify-between" : "justify-end"}`}>
						{state.feedback && !state.isCorrect && (
							<button onClick={toggleErrorHighlight} className="bg-warning-500 text-white px-4 py-2 rounded hover:bg-warning-700 transition duration-300">
								{showErrorHighlight ? "Hide Error" : "Show Error ❌"}
							</button>
						)}

						<button onClick={handleCheckAnswer} className="bg-primary-500 text-white px-6 py-2 rounded hover:bg-primary-600 transition duration-300 flex items-center">
							<MdCheck className="mr-2" /> Check
						</button>
					</div>

					<div className="flex justify-start space-x-2 mt-4">{showErrorHighlight && <SentenceErrorHighlight correctText={grammarExerciseSentences[state.currentSentenceIndex].answer} userInput={state.userAnswer} />}</div>

					{state.feedback && <p className={`mt-4 ${state.isCorrect ? "text-green-600" : "text-red-600"}  font-semibold`}>{state.feedback}</p>}
					{state.showExplanation && <p className="text-gray-700 mt-4">Explanation: {grammarExerciseSentences[state.currentSentenceIndex].explanation}</p>}
					<div className="flex justify-end space-x-2 mt-2">
						{state.showExplanation && (
							<button onClick={handleNextSentence} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300 flex items-center">
								<MdArrowForward className="mr-2" /> Next Sentence
							</button>
						)}
					</div>
				</div>
			</div>
			<Modal show={showModal} onClose={() => onCloseModal()} title="Congratulations" icon={<span className="text-6xl">🎉</span>} color="bg-green-500">
				<p className="text-xl font-bold text-green-600">You finished the exercise!</p>
			</Modal>
		</div>
	);

	const renderCompletionScreen = () => (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
			<h1 className="font-bold text-2xl mb-2">Congratulations!</h1>
			<p className="mb-4">You have completed the Sentence Correction Exercise.</p>
			<button
				className="bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-700 transition duration-300"
				onClick={() => {
					updateState({ currentSentenceIndex: 0, gameStarted: true, userAnswer: "", feedback: "", showExplanation: false });
				}}
			>
				Restart
			</button>
		</div>
	);

	return (
		<Layout>
			{!state.gameStarted && renderWelcomeScreen()}
			{state.gameStarted && state.currentSentenceIndex < grammarExerciseSentences.length && renderExerciseScreen()}
			{state.gameStarted && state.currentSentenceIndex === grammarExerciseSentences.length && renderCompletionScreen()}
		</Layout>
	);
};

export default SentenceCorrectionExercise;
