import React, { useState, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import correctSound from "../../../assets/audio/correct-choice.mp3";
import incorrectSound from "../../../assets/audio/incorrect-choice.mp3";
import Layout from "../../Layout/Layout";
import { Link, useParams } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";

interface VerbConjugationState {
	pronoun: string;
	verb: string;
	tense: string;
	userInput: string;
	feedback: string;
	isCorrect: boolean;
	attempts: number;
	successes: number;
}

type Tense = "Präsens" | "Präteritum";
type Pronoun = "ich" | "du" | "er" | "sie" | "es" | "wir" | "ihr" | "sie" | "Sie";
type Conjugation = { pronoun: Pronoun; conjugation: string };
type VerbConjugation = { verb: string; tense: Tense; conjugations: Conjugation[] };

const pronouns: Pronoun[] = ["ich", "du", "er", "sie", "es", "wir", "ihr", "sie", "Sie"];

// Define createVerbConjugation as a function type that returns VerbConjugation
const createVerbConjugation = (verb: string, tense: Tense, conjugations: string[]): VerbConjugation => ({
	verb,
	tense,
	conjugations: pronouns.map((pronoun, index) => ({
		pronoun,
		conjugation: conjugations[index],
	})),
});

const seinPrasens: string[] = ["bin", "bist", "ist", "ist", "ist", "sind", "seid", "sind", "sind"];
const seinPrateritum: string[] = ["war", "warst", "war", "war", "war", "waren", "wart", "waren", "waren"];
const habenPrasens: string[] = ["habe", "hast", "hat", "hat", "hat", "haben", "habt", "haben", "haben"];
const habenPrateritum: string[] = ["hatte", "hattest", "hatte", "hatte", "hatte", "hatten", "hattet", "hatten", "hatten"];
const machenPrasens = ["mache", "machst", "macht", "macht", "macht", "machen", "macht", "machen", "machen"];
const machenPrateritum = ["machte", "machtest", "machte", "machte", "machte", "machten", "machtet", "machten", "machten"];
const gehenPrasens = ["gehe", "gehst", "geht", "geht", "geht", "gehen", "geht", "gehen", "gehen"];
const gehenPrateritum = ["ging", "gingst", "ging", "ging", "ging", "gingen", "gingt", "gingen", "gingen"];
const kommenPrasens = ["komme", "kommst", "kommt", "kommt", "kommt", "kommen", "kommt", "kommen", "kommen"];
const kommenPrateritum = ["kam", "kamst", "kam", "kam", "kam", "kamen", "kamt", "kamen", "kamen"];

const verbConjugations: VerbConjugation[] = [
	createVerbConjugation("sein", "Präsens", seinPrasens),
	createVerbConjugation("sein", "Präteritum", seinPrateritum),
	createVerbConjugation("haben", "Präsens", habenPrasens),
	createVerbConjugation("haben", "Präteritum", habenPrateritum),
	createVerbConjugation("gehen", "Präsens", gehenPrasens),
	createVerbConjugation("gehen", "Präteritum", gehenPrateritum),
	createVerbConjugation("machen", "Präsens", machenPrasens),
	createVerbConjugation("machen", "Präteritum", machenPrateritum),
	createVerbConjugation("kommen", "Präsens", kommenPrasens),
	createVerbConjugation("kommen", "Präteritum", kommenPrateritum),
];

const VerbConjugationSlotMachineExercise: React.FC = () => {
	const { lesson_number } = useParams<{ lesson_number: string }>();
	const { t } = useTranslation();
	const [state, setState] = useState<VerbConjugationState>({
		pronoun: "",
		verb: "",
		tense: "",
		userInput: "",
		feedback: "",
		isCorrect: false,
		attempts: 0,
		successes: 0,
	});
	const [isAnimating, setIsAnimating] = useState(false);
	const randomizeSelection = useCallback(() => {
		setIsAnimating(true); // Start the animation
		setTimeout(() => {
			const randomPronoun = pronouns[Math.floor(Math.random() * pronouns.length)];
			const randomVerb = verbs[Math.floor(Math.random() * verbs.length)];
			const randomTense = tenses[Math.floor(Math.random() * tenses.length)];
			setState((prevState) => ({ ...prevState, pronoun: randomPronoun, verb: randomVerb, tense: randomTense }));
			setIsAnimating(false); // Stop the animation
		}, 3000); // Adjust the duration to match your animation
	}, []);

	const playSound = useCallback((soundEffect: string) => {
		new Audio(soundEffect).play();
	}, []);

	const verbs = ["sein", "haben", "machen", "gehen", "kommen"];
	const tenses = ["Präsens", "Präteritum"];

	const checkAnswer = useCallback(() => {
		if (state.userInput.trim() === "") return;
		// Find the verb conjugation set for the selected verb and tense
		const conjugationSet = verbConjugations.find((vc) => vc.verb === state.verb && vc.tense === state.tense);
		console.log(verbConjugations);
		console.log(conjugationSet);

		if (!conjugationSet) {
			console.error("Conjugation set not found");
			return;
		}

		// Find the correct conjugation for the selected pronoun
		const correctConjugation = conjugationSet.conjugations.find((c) => c.pronoun === state.pronoun)?.conjugation;

		if (!correctConjugation) {
			console.error("Correct conjugation not found");
			return;
		}

		// Construct the correct sentence
		const correctSentence = `${state.pronoun} ${correctConjugation}`;

		// Compare the correct sentence with the user's input
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
		randomizeSelection();
	}, []);

	return (
		<Layout>
			<div className="flex flex-col items-center justify-center min-h-[calc(100vh-18rem)] sm:min-h-[calc(100vh-15rem)] bg-gray-100">
				<h1 className="text-2xl text-gray-700 font-bold py-8">{t("Verb Conjugation Slot Machine")}</h1>
				<div className="mt-4">
					<div className="flex justify-center space-x-2 text-xl md:text-4xl">
						<div className="overflow-hidden h-16 w-28 md:h-24 md:w-48 text-gray-900 text-center bg-white shadow-md rounded-md">
							<div className={`transition-transform duration-2000 ${isAnimating ? "spinAnimation" : ""}`}>
								{[...pronouns, ...pronouns].map((pronoun, index) => (
									<div key={index} className="flex items-center justify-center h-16 md:h-24">
										{isAnimating ? pronoun : state.pronoun}
									</div>
								))}
							</div>
						</div>
						<div className="overflow-hidden h-16 w-28 md:h-24 md:w-48 text-gray-900 text-center bg-white shadow-md rounded-md">
							<div className={`transition-transform duration-2000 ${isAnimating ? "spinAnimation" : ""}`}>
								{[...verbs, ...verbs].map((verb, index) => (
									<div key={index} className="flex items-center justify-center h-16 md:h-24">
										{isAnimating ? verb : state.verb}
									</div>
								))}
							</div>
						</div>
						<div className="overflow-hidden h-16 w-28 md:h-24 md:w-48 text-gray-900 text-center bg-white shadow-md rounded-md">
							<div className={`transition-transform duration-2000 ${isAnimating ? "spinAnimation" : ""}`}>
								{[...tenses, ...tenses].map((tense, index) => (
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
		</Layout>
	);
};

export default VerbConjugationSlotMachineExercise;
