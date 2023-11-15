import React, { useState, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";

interface VerbConjugationState {
	pronoun: string;
	verb: string;
	tense: string;
	userInput: string;
	feedback: string;
	attempts: number;
	successes: number;
}

const VerbConjugationSlotMachineExercise: React.FC = () => {
	const { t } = useTranslation();
	const [state, setState] = useState<VerbConjugationState>({
		pronoun: "",
		verb: "",
		tense: "",
		userInput: "",
		feedback: "",
		attempts: 0,
		successes: 0,
	});

	// const pronouns = ["ich", "du", "er", "sie", "es", "wir", "ihr", "sie", "Sie"];
	const verbs = ["sein", "haben", "machen", "gehen", "kommen"];
	const tenses = ["Präsens", "Präteritum", "Perfekt", "Plusquamperfekt", "Futur I"];

	const randomizeSelection = useCallback(() => {
		const randomPronoun = pronouns[Math.floor(Math.random() * pronouns.length)];
		const randomVerb = verbs[Math.floor(Math.random() * verbs.length)];
		const randomTense = tenses[Math.floor(Math.random() * tenses.length)];
		setState((prevState) => ({ ...prevState, pronoun: randomPronoun, verb: randomVerb, tense: randomTense }));
	}, []);

	type Tense = "Präsens" | "Präteritum";
	type Pronoun = "ich" | "du" | "er" | "sie" | "es" | "wir" | "ihr" | "sie" | "Sie";
	type Conjugation = { pronoun: Pronoun; conjugation: string };
	type VerbConjugation = { verb: string; tense: Tense; conjugations: Conjugation[] };

	const pronouns: Pronoun[] = ["ich", "du", "er", "sie", "es", "wir", "ihr", "sie", "Sie"];

	function createVerbConjugation(verb: string, tense: Tense, conjugations: string[]): VerbConjugation {
		return {
			verb,
			tense,
			conjugations: pronouns.map((pronoun, index) => ({
				pronoun,
				conjugation: conjugations[index],
			})),
		};
	}

	const seinPrasens: string[] = ["bin", "bist", "ist", "ist", "ist", "sind", "seid", "sind", "sind"];
	const seinPrateritum: string[] = ["war", "warst", "war", "war", "war", "waren", "wart", "waren", "waren"];
	const habenPrasens: string[] = ["habe", "hast", "hat", "hat", "hat", "haben", "habt", "haben", "haben"];
	const habenPrateritum: string[] = ["hatte", "hattest", "hatte", "hatte", "hatte", "hatten", "hattet", "hatten", "hatten"];
	const werdenPrasens = ["werde", "wirst", "wird", "wird", "wird", "werden", "werdet", "werden", "werden"];
	const werdenPrateritum = ["wurde", "wurdest", "wurde", "wurde", "wurde", "wurden", "wurdet", "wurden", "wurden"];

	const sagenPrasens = ["sage", "sagst", "sagt", "sagt", "sagt", "sagen", "sagt", "sagen", "sagen"];
	const sagenPrateritum = ["sagte", "sagtest", "sagte", "sagte", "sagte", "sagten", "sagtet", "sagten", "sagten"];
	const nehmenPrasens = ["nehme", "nimmst", "nimmt", "nimmt", "nimmt", "nehmen", "nehmt", "nehmen", "nehmen"];
	const nehmenPrateritum = ["nahm", "nahmst", "nahm", "nahm", "nahm", "nahmen", "nahmt", "nahmen", "nahmen"];

	const sehenPrasens = ["sehe", "siehst", "sieht", "sieht", "sieht", "sehen", "seht", "sehen", "sehen"];
	const sehenPrateritum = ["sah", "sahst", "sah", "sah", "sah", "sahen", "saht", "sahen", "sahen"];

	const gebenPrasens = ["gebe", "gibst", "gibt", "gibt", "gibt", "geben", "gebt", "geben", "geben"];
	const gebenPrateritum = ["gab", "gabst", "gab", "gab", "gab", "gaben", "gabt", "gaben", "gaben"];
	const findenPrasens = ["finde", "findest", "findet", "findet", "findet", "finden", "findet", "finden", "finden"];
	const findenPrateritum = ["fand", "fandest", "fand", "fand", "fand", "fanden", "fandet", "fanden", "fanden"];

	const gehenPrasens = ["gehe", "gehst", "geht", "geht", "geht", "gehen", "geht", "gehen", "gehen"];
	const gehenPrateritum = ["ging", "gingst", "ging", "ging", "ging", "gingen", "gingt", "gingen", "gingen"];

	const machenPrasens = ["mache", "machst", "macht", "macht", "macht", "machen", "macht", "machen", "machen"];
	const machenPrateritum = ["machte", "machtest", "machte", "machte", "machte", "machten", "machtet", "machten", "machten"];
	const denkenPrasens = ["denke", "denkst", "denkt", "denkt", "denkt", "denken", "denkt", "denken", "denken"];
	const denkenPrateritum = ["dachte", "dachtest", "dachte", "dachte", "dachte", "dachten", "dachtet", "dachten", "dachten"];
	const kommenPrasens = ["komme", "kommst", "kommt", "kommt", "kommt", "kommen", "kommt", "kommen", "kommen"];
	const kommenPrateritum = ["kam", "kamst", "kam", "kam", "kam", "kamen", "kamt", "kamen", "kamen"];
	const wissenPrasens = ["weiß", "weißt", "weiß", "weiß", "weiß", "wissen", "wisst", "wissen", "wissen"];
	const wissenPrateritum = ["wusste", "wusstest", "wusste", "wusste", "wusste", "wussten", "wusstet", "wussten", "wussten"];

	const verbConjugations: VerbConjugation[] = [
		createVerbConjugation("sein", "Präsens", seinPrasens),
		createVerbConjugation("sein", "Präteritum", seinPrateritum),
		createVerbConjugation("haben", "Präsens", habenPrasens),
		createVerbConjugation("haben", "Präteritum", habenPrateritum),
        createVerbConjugation("werden", "Präsens", werdenPrasens),
		createVerbConjugation("werden", "Präteritum", werdenPrateritum),
        createVerbConjugation("sagen", "Präsens", sagenPrasens),
		createVerbConjugation("sagenn", "Präteritum", sagenPrateritum),
        createVerbConjugation("nehmen", "Präsens", nehmenPrasens),
		createVerbConjugation("nehmen", "Präteritum", nehmenPrateritum),
        createVerbConjugation("sehen", "Präsens", sehenPrasens),
		createVerbConjugation("sehenn", "Präteritum", sehenPrateritum),
        createVerbConjugation("geben", "Präsens", gebenPrasens),
		createVerbConjugation("gebenn", "Präteritum", gebenPrateritum),
        createVerbConjugation("finden", "Präsens", findenPrasens),
		createVerbConjugation("finden", "Präteritum", findenPrateritum),
        createVerbConjugation("gehen", "Präsens", gehenPrasens),
		createVerbConjugation("gehenn", "Präteritum", gehenPrateritum),
        createVerbConjugation("machen", "Präsens", machenPrasens),
		createVerbConjugation("machen", "Präteritum", machenPrateritum),
        createVerbConjugation("denken", "Präsens", denkenPrasens),
		createVerbConjugation("denken", "Präteritum", denkenPrateritum),
        createVerbConjugation("kommen", "Präsens", kommenPrasens),
		createVerbConjugation("kommen", "Präteritum", kommenPrateritum),
        createVerbConjugation("wissen", "Präsens", wissenPrasens),
		createVerbConjugation("wissen", "Präteritum", wissenPrateritum),
	];

	const checkAnswer = useCallback(() => {
		// Find the verb conjugation set for the selected verb and tense
		const conjugationSet = verbConjugations.find((vc) => vc.verb === state.verb && vc.tense === state.tense);

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
				userInput: "", // Optionally clear the input field
			}));
		} else {
			setState((prevState) => ({
				...prevState,
				feedback: `Incorrect. The correct answer is '${correctSentence}'.`,
				userInput: "", // Optionally clear the input field
			}));
		}

		randomizeSelection(); // Prepare for the next question
	}, [state, randomizeSelection]);

	useEffect(() => {
		randomizeSelection();
	}, []);

	return (
		<div className="p-4">
			<div className="text-center">
				<h1 className="text-2xl font-bold">{t("Verb Conjugation Slot Machine")}</h1>
			</div>
			<div className="mt-4">
				<div className="flex justify-center space-x-2">
					<div className="p-2 border-2">{state.pronoun}</div>
					<div className="p-2 border-2">{state.verb}</div>
					<div className="p-2 border-2">{state.tense}</div>
				</div>
				<div className="mt-4">
					<input type="text" className="border-2 p-2 w-full" placeholder="Type the correct sentence here" value={state.userInput} onChange={(e) => setState((prevState) => ({ ...prevState, userInput: e.target.value }))} />
					<button className="mt-2 p-2 bg-blue-500 text-white w-full" onClick={checkAnswer}>
						Submit
					</button>
				</div>
				{state.feedback && <div className="mt-4 p-2 border-2">{state.feedback}</div>}
			</div>
		</div>
	);
};

export default VerbConjugationSlotMachineExercise;
