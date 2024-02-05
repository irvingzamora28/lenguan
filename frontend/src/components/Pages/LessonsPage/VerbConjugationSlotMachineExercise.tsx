import React, { useState, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import correctSound from "../../../assets/audio/correct-choice.mp3";
import incorrectSound from "../../../assets/audio/incorrect-choice.mp3";
import Layout from "../../Layout/Layout";
import { Link, useLocation, useParams } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import { VerbConjugation, VerbConjugationExercise } from "../../../types/exercise";
import { useFetchVerbConjugationExercises } from "../../../hooks/fetch/useFetchVerbConjugationExercises";
import { useUser } from "../../../redux/hooks";

interface VerbConjugationState {
	pronoun: string;
	verb: string;
	tense: string;
	userInput: string;
	feedback: string;
	isCorrect: boolean;
	gameStarted: boolean;
	attempts: number;
	successes: number;
}

const VerbConjugationSlotMachineExercise: React.FC = () => {
	const { lesson_number } = useParams<{ lesson_number: string }>();
	const { t } = useTranslation();
	const locationState = useLocation().state;
	const user = useUser();
	const shouldFetchVerbConjugationExercises = !locationState?.exerciseDetails;
	const [verbConjugationExerciseDetails, setVerbConjugationExerciseDetails] = useState(locationState?.exerciseDetails || []);
	const [verbConjugationExerciseWords, verbConjugationExerciseWordsError] = useFetchVerbConjugationExercises(user?.course?._id ?? "", lesson_number ?? "", shouldFetchVerbConjugationExercises);

	const [verbConjugations, setVerbConjugations] = useState<VerbConjugation[]>();
	const [verbs, setVerbs] = useState<string[]>();
	const [pronouns, setPronouns] = useState<string[]>();
	const [tenses, setTenses] = useState<string[]>();

	useEffect(() => {
		if (!shouldFetchVerbConjugationExercises) {
			setVerbConjugationExerciseDetails(locationState.exerciseDetails);
		} else if (verbConjugationExerciseWordsError) {
			console.error("Error fetching vocabulary exercises:", verbConjugationExerciseWordsError);
		} else {
			setVerbConjugationExerciseDetails(
				verbConjugationExerciseWords.map((word) => ({
					details: {
						pronouns: word.pronouns,
						verb: word.verb,
						tenses: word.tenses,
						conjugations: word.conjugations,
					},
				}))
			);
		}
	}, [verbConjugationExerciseWords, verbConjugationExerciseWordsError, shouldFetchVerbConjugationExercises, locationState]);

	const [state, setState] = useState<VerbConjugationState>({
		pronoun: "",
		verb: "",
		tense: "",
		userInput: "",
		feedback: "",
		isCorrect: false,
		gameStarted: false,
		attempts: 0,
		successes: 0,
	});
	const [isAnimating, setIsAnimating] = useState(false);

	const updateState = useCallback((newState: Partial<typeof state>) => {
		setState((prevState) => ({ ...prevState, ...newState }));
	}, []);

	useEffect(() => {
		const verbConjugations = verbConjugationExerciseDetails
			.map((exercise: { details: VerbConjugationExercise }) => {
				// Filter conjugations based on the tenses and pronouns array
				return exercise.details.tenses
					.map((tense) => {
						return exercise.details.conjugations
							.filter((conjugation) => conjugation.tense === tense)
							.map((conjugation) => {
								// Filter individual conjugations based on the pronouns array
								const filteredConjugations = conjugation.conjugations.filter((c) => exercise.details.pronouns.includes(c.pronoun));

								return {
									verb: conjugation.verb,
									tense: conjugation.tense,
									conjugations: filteredConjugations,
								};
							});
					})
					.flat();
			})
			.flat(); // Flatten the array since map within map creates a nested array
		setVerbConjugations(verbConjugations);
		setPronouns(verbConjugationExerciseDetails.map((exercise: { details: VerbConjugationExercise }) => exercise.details.pronouns).flat());
		setTenses(verbConjugationExerciseDetails.map((exercise: { details: VerbConjugationExercise }) => exercise.details.tenses).flat());
		const verbs: string[] = Array.from(new Set(verbConjugations.map((item: { verb: string }) => item.verb)));
		setVerbs(verbs);
	}, [verbConjugationExerciseDetails]);

	const randomizeSelection = useCallback(() => {
		setIsAnimating(true); // Start the animation
		setTimeout(() => {
			const randomPronoun = pronouns && pronouns.length > 0 ? pronouns[Math.floor(Math.random() * pronouns.length)] : "";
			const randomVerb = verbs && verbs.length > 0 ? verbs[Math.floor(Math.random() * verbs.length)] : "";
			const randomTense = tenses && tenses.length > 0 ? tenses[Math.floor(Math.random() * tenses.length)] : "";
			setState((prevState) => ({ ...prevState, pronoun: randomPronoun, verb: randomVerb, tense: randomTense }));
			setIsAnimating(false); // Stop the animation
		}, 3000);
	}, [pronouns, verbs, tenses]);

	const playSound = useCallback((soundEffect: string) => {
		new Audio(soundEffect).play();
	}, []);

	const checkAnswer = useCallback(() => {
		if (state.userInput.trim() === "") return;

		// Find the verb conjugation set for the selected verb and tense
		const conjugationSet = verbConjugations?.find((vc) => vc.verb === state.verb && vc.tense === state.tense);

		if (!conjugationSet) {
			console.error("Conjugation set not found");
			return;
		}

		// Find the correct conjugation
		const correctConjugation = conjugationSet.conjugations.find((c) => c.pronoun === state.pronoun)?.conjugation;
		if (!correctConjugation) {
			console.error("Correct conjugation not found");
			return;
		}

		// Remove text inside parentheses and trim for cases where there are explanations inside parentheses
		let selectedPronoun = state.pronoun.replace(/\s*\(.*?\)\s*/g, "").trim();

		// Construct the correct sentence
		const correctSentence = `${selectedPronoun} ${correctConjugation}`;

		// Compare the adjusted correct sentence with the user's input
		if (state.userInput.trim() === correctSentence) {
			setState((prevState) => ({
				...prevState,
				feedback: "Correct! Great job.",
				successes: prevState.successes + 1,
				isCorrect: true,
				attempts: prevState.attempts + 1,
				userInput: "", // Optionally clear the input field
			}));
			playSound(correctSound);
		} else {
			setState((prevState) => ({
				...prevState,
				feedback: `Incorrect. The correct answer is '${correctSentence}'.`,
				isCorrect: false,
				attempts: prevState.attempts + 1,
				userInput: "", // Optionally clear the input field
			}));
			playSound(incorrectSound);
		}

		randomizeSelection(); // Prepare for the next question
	}, [state, randomizeSelection]);

	useEffect(() => {
		// Check verbs, tenses and pronouns are not empty
		if (verbs?.length && tenses?.length && pronouns?.length) {
			randomizeSelection();
		}
	}, [verbs, tenses, pronouns]);

	const renderWelcomeScreen = () => (
		<>
			<div className="text-center p-4 mb-6 bg-white shadow-md rounded-md">
				<h1 className="font-bold text-2xl mb-2">{t("Welcome to Verb Conjugation Slot Machine!")}</h1>
				<p className="mb-4">{t("Test your skills in verb conjugation.")}</p>
			</div>
			<div className="back-button-section flex place-content-center sm:place-content-end">
				<Link
					to={`/lessons/${lesson_number}/exercises`}
					className="back-button-section__link flex items-center w-fit border border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white font-bold py-2 px-4 my-2 rounded-lg shadow sm:col-start-3 sm:col-end-4 order-last sm:order-none"
				>
					<MdArrowBack className="back-button-section__icon mr-2" /> Back to exercises
				</Link>
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

	const renderExerciseScreen = () => (
		<>
			<div className="flex flex-col items-center justify-center min-h-[calc(100vh-18rem)] sm:min-h-[calc(100vh-15rem)] bg-gray-100">
				<h1 className="text-2xl text-gray-700 font-bold py-8">{t("Verb Conjugation Slot Machine")}</h1>
				<div className="mt-4">
					<div className="flex justify-center space-x-2 text-xl md:text-4xl">
						<div className="overflow-hidden h-16 w-28 md:h-24 md:w-48 text-gray-900 text-center bg-white shadow-md rounded-md">
							<div className={`transition-transform duration-2000 ${isAnimating ? "spinAnimation" : ""}`}>
								{(pronouns || []).map((pronoun, index) => (
									<div key={index} className="flex items-center justify-center h-16 md:h-24">
										{isAnimating ? pronoun : state.pronoun}
									</div>
								))}
							</div>
						</div>
						<div className="overflow-hidden h-16 w-28 md:h-24 md:w-48 text-gray-900 text-center bg-white shadow-md rounded-md">
							<div className={`transition-transform duration-2000 ${isAnimating ? "spinAnimation" : ""}`}>
								{(verbs || []).map((verb, index) => (
									<div key={index} className="flex items-center justify-center h-16 md:h-24">
										{isAnimating ? verb : state.verb}
									</div>
								))}
							</div>
						</div>
						<div className="overflow-hidden h-16 w-28 md:h-24 md:w-48 text-gray-900 text-center bg-white shadow-md rounded-md">
							<div className={`transition-transform duration-2000 ${isAnimating ? "spinAnimation" : ""}`}>
								{(tenses || []).map((tense, index) => (
									<div key={index} className="flex items-center justify-center h-16 md:h-24">
										{isAnimating ? tense : state.tense}
									</div>
								))}
							</div>
						</div>
					</div>
					<div className="mt-4">
						<input
							type="text"
							autoFocus
							className="border-2 p-2 w-full"
							placeholder="Type the correct sentence here"
							value={state.userInput}
							onChange={(event) => setState((prevState) => ({ ...prevState, userInput: event.target.value }))}
							onKeyDown={(event) => {
								if (event.key === "Enter") {
									checkAnswer();
								}
							}}
						/>
						<button className="mt-2 p-2 bg-blue-500 text-white w-full rounded-lg shadow-md hover:bg-blue-600 hover:shadow-lg transition duration-300 ease-in-out" onClick={checkAnswer}>
							Check
						</button>
					</div>
					{state.feedback && (
						<div className={`mt-4 p-2 border-2 ${state.isCorrect ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
							{state.isCorrect ? "✅" : "❌"} {state.feedback}
						</div>
					)}
					<div className="mt-4 p-2 border-2 bg-yellow-100 text-yellow-800">
						<p>Attempts: {state.attempts}</p>
						<p>Correct Answers: {state.successes}</p>
					</div>
				</div>
				<Link to={`/lessons/${lesson_number}/exercises`} className="flex absolute bottom-4 right-4 p-2 items-center border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white font-bold py-2 px-4 rounded-lg shadow">
					<MdArrowBack className="ml-2" /> Back to Exercises
				</Link>
			</div>
		</>
	);

	return (
		<Layout>
			{!state.gameStarted && renderWelcomeScreen()}
			{state.gameStarted && renderExerciseScreen()}
		</Layout>
	);
};

export default VerbConjugationSlotMachineExercise;
