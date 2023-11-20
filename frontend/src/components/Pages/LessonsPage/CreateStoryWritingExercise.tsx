import React, { useState, useCallback, useEffect, useRef } from "react";
import correctSound from "../../../assets/audio/correct-choice.mp3";
import incorrectSound from "../../../assets/audio/incorrect-choice.mp3";
import { useTranslation } from "react-i18next"; // Assuming i18next is used for translations
import Layout from "../../Layout/Layout";

interface StoryChoice {
	germanText: string;
	nextSectionId: string; // Unique identifier for the next section
}

interface StorySection {
	id: string; // Unique identifier for each section
	germanText: string;
	englishTranslation: string;
	choices?: StoryChoice[]; // Optional, only for decision points
	nextSectionId?: string; // Optional, could be the end of the story or has decision points
}

const storyData: StorySection[] = [
	{
		id: "start",
		germanText: "Lena steht am Münchener Hauptbahnhof und überlegt, was sie mit ihrem Tag anfangen soll.",
		englishTranslation: "Lena is at the Munich main station, pondering what to do with her day.",
		choices: [
			{
				germanText: "Sie besucht den Englischen Garten.",
				nextSectionId: "englishGarden",
			},
			{
				germanText: "Sie geht in ein Café in der Innenstadt.",
				nextSectionId: "cityCafe",
			},
		],
	},
	{
		id: "englishGarden",
		germanText: "Im Englischen Garten beobachtet Lena die Natur und entspannt sich.",
		englishTranslation: "In the English Garden, Lena observes nature and relaxes.",
		choices: [
			{
				germanText: "Sie macht eine Pause am See.",
				nextSectionId: "lakeBreak",
			},
			{
				germanText: "Sie besucht das Biergarten.",
				nextSectionId: "beerGarden",
			},
		],
	},
	{
		id: "cityCafe",
		germanText: "Im Café bestellt Lena einen Kaffee und ein Stück Kuchen.",
		englishTranslation: "At the café, Lena orders a coffee and a piece of cake.",
		choices: [
			{
				germanText: "Sie liest ein Buch.",
				nextSectionId: "readingBook",
			},
			{
				germanText: "Sie beobachtet die Leute.",
				nextSectionId: "peopleWatching",
			},
		],
	},
	{
		id: "lakeBreak",
		germanText: "Am See macht Lena ein Picknick und genießt die Sonne. Sie fühlt sich entspannt.",
		englishTranslation: "By the lake, Lena has a picnic and enjoys the sun. She feels relaxed.",
		choices: [
			{
				germanText: "Sie entscheidet sich, ein Nickerchen zu machen.",
				nextSectionId: "napByLake",
			},
			{
				germanText: "Sie fängt an, Enten zu füttern.",
				nextSectionId: "feedingDucks",
			},
		],
	},
	{
		id: "beerGarden",
		germanText: "Im Biergarten trifft Lena alte Bekannte und sie reden über alte Zeiten.",
		englishTranslation: "In the beer garden, Lena meets old acquaintances and they talk about old times.",
		choices: [
			{
				germanText: "Sie beschließen, zusammen ein Konzert zu besuchen.",
				nextSectionId: "concertVisit",
			},
			{
				germanText: "Sie laden Lena zu einer Bootsfahrt ein.",
				nextSectionId: "boatTrip",
			},
		],
	},
	{
		id: "readingBook",
		germanText: "Das Buch ist so fesselnd, dass Lena beschließt, in den Park zu gehen und dort weiterzulesen.",
		englishTranslation: "The book is so captivating that Lena decides to go to the park and continue reading there.",
		choices: [
			{
				germanText: "Im Park findet sie einen gemütlichen Platz im Schatten.",
				nextSectionId: "parkShade",
			},
			{
				germanText: "Im Park trifft sie einen alten Freund.",
				nextSectionId: "oldFriendInPark",
			},
		],
	},
	{
		id: "peopleWatching",
		germanText: "Lena findet es interessant, die verschiedenen Menschen zu beobachten und ihre Geschichten zu erraten.",
		englishTranslation: "Lena finds it interesting to watch the various people and guess their stories.",
		choices: [
			{
				germanText: "Sie beginnt, Skizzen von einigen Passanten zu machen.",
				nextSectionId: "makingSketches",
			},
			{
				germanText: "Sie entschließt sich, mit jemandem ein Gespräch anzufangen.",
				nextSectionId: "startConversation",
			},
		],
	},
	// Ending sections
	{
		id: "napByLake",
		germanText: "Nach ihrem Nickerchen fühlt sich Lena erfrischt und bereit für neue Abenteuer.",
		englishTranslation: "After her nap, Lena feels refreshed and ready for new adventures.",
		// End of this story path
	},
	{
		id: "feedingDucks",
		germanText: "Die Enten zu füttern bringt Lena viel Freude und sie verbringt den Rest des Tages am See.",
		englishTranslation: "Feeding the ducks brings Lena much joy and she spends the rest of the day by the lake.",
		// End of this story path
	},
	{
		id: "concertVisit",
		germanText: "Das Konzert war großartig und Lena genießt den Abend mit ihren Freunden.",
		englishTranslation: "The concert was great and Lena enjoys the evening with her friends.",
		// End of this story path
	},
	{
		id: "boatTrip",
		germanText: "Die Bootsfahrt auf dem Fluss ist wunderschön und ein perfekter Abschluss für Lenas Tag.",
		englishTranslation: "The boat trip on the river is beautiful and a perfect end to Lena’s day.",
		// End of this story path
	},
	{
		id: "parkShade",
		germanText: "Im Schatten eines großen Baumes genießt Lena die Ruhe und vertieft sich in ihr Buch.",
		englishTranslation: "In the shade of a large tree, Lena enjoys the peace and delves deeper into her book.",
		// End of this story path
	},
	{
		id: "oldFriendInPark",
		germanText: "Das Wiedersehen mit dem alten Freund führt zu einem langen und freudigen Gespräch.",
		englishTranslation: "The reunion with an old friend leads to a long and joyful conversation.",
		// End of this story path
	},
	{
		id: "makingSketches",
		germanText: "Lena entdeckt ihr Talent fürs Zeichnen und verbringt den Nachmittag mit Skizzieren.",
		englishTranslation: "Lena discovers her talent for drawing and spends the afternoon sketching.",
		// End of this story path
	},
	{
		id: "startConversation",
		germanText: "Das Gespräch entwickelt sich spannend und Lena findet einen neuen Freund.",
		englishTranslation: "The conversation turns out to be exciting and Lena makes a new friend.",
		// End of this story path
	},
	// ... add more sections if needed
];

// TODO: Do not update the text that shows the mistake in the feedback section
// TODO: Hide feedback area when the answer submitted is correct
// TODO: Make both options the same width and height depending on the text of the larger option and improve style

const CreateStoryWritingExercise: React.FC = () => {
	const { t } = useTranslation();
	const specialCharacters = ["ä", "ö", "ü", "ß"];
	const inputRef = useRef<HTMLInputElement>(null);
	const [errorIndex, setErrorIndex] = useState<number | null>(null);
	const [isIncomplete, setIsIncomplete] = useState(false);
	const [errorWordIndices, setErrorWordIndices] = useState<[number, number] | null>(null);
	const [isStoryComplete, setIsStoryComplete] = useState(false);

	const [state, setState] = useState({
		currentSectionId: "start",
		userInput: "",
		storyProgress: [] as string[], // Track IDs of completed sections
		showChoices: false, // To determine when to show choices
		gameStarted: false,
	});
	console.log(storyData);

	const updateState = useCallback((newState: Partial<typeof state>) => {
		setState((prevState) => ({ ...prevState, ...newState }));
	}, []);

	const currentSection = storyData.find((section) => section.id === state.currentSectionId);

	const findFirstErrorIndex = (input: string, correctText: string): number | null => {
		for (let i = 0; i < input.length; i++) {
			if (i >= correctText.length || input[i] !== correctText[i]) {
				return i;
			}
		}
		return null;
	};

	const findErrorWordIndices = (input: string, correctText: string, errorIndex: number): [number, number] => {
		let start = input.slice(0, errorIndex).lastIndexOf(" ") + 1;
		let end = correctText.indexOf(" ", start);
		end = end === -1 ? correctText.length : end;
		return [start, end];
	};

	const checkInput = useCallback(() => {
		const correctText = currentSection?.germanText || "";
		if (state.userInput === correctText) {
			playSound(correctSound);

			const hasChoices = currentSection?.choices && currentSection.choices.length > 0;
			const hasNextSection = currentSection?.nextSectionId !== undefined;

			setState((prevState) => ({
				...prevState,
				userInput: "",
				storyProgress: [...prevState.storyProgress, prevState.currentSectionId],
				showChoices: hasChoices ? true : false, // Ensures showChoices is always a boolean
			}));
			setIsIncomplete(false);
			if (!hasChoices && !hasNextSection) {
				setIsStoryComplete(true);
			}
		} else if (state.userInput.startsWith(correctText.slice(0, state.userInput.length))) {
			// Partially correct, but incomplete
			setIsIncomplete(true);
			setErrorIndex(null);
			// Focus on the end of the current input
			if (inputRef.current) {
				inputRef.current.focus();
				inputRef.current.setSelectionRange(state.userInput.length, state.userInput.length);
			}
			setErrorWordIndices(null);
		} else {
			// existing incorrect logic
			setIsIncomplete(false);
			playSound(incorrectSound);
			let errorIdx = findFirstErrorIndex(state.userInput, correctText);
			setErrorIndex(errorIdx);
			setState((prevState) => ({
				...prevState,
				showChoices: false, // Hide choices on incorrect input
			}));

			if (errorIdx !== null) {
				let [start, end] = findErrorWordIndices(state.userInput, correctText, errorIdx);
				console.log([start, end]);

				setErrorWordIndices([start, end]);
			} else {
				setErrorWordIndices(null);
			}

			// Focus the input and set cursor position
			if (inputRef.current && errorIdx !== null) {
				inputRef.current.focus();
				inputRef.current.setSelectionRange(errorIdx, errorIdx);
			}
		}
	}, [state.userInput, state.currentSectionId, currentSection]);

	const handleUserInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setState((prevState) => ({ ...prevState, userInput: event.target.value }));
	};

	const handleChoice = (nextSectionId: string) => {
		setState((prevState) => ({
			...prevState,
			currentSectionId: nextSectionId,
			showChoices: false, // Hide choices as we move to the next section
		}));
	};

	const handleSpecialCharacterInput = (character: string) => {
		if (inputRef.current) {
			const cursorPosition = inputRef.current.selectionStart ?? 0;
			const textBeforeCursor = state.userInput.slice(0, cursorPosition);
			const textAfterCursor = state.userInput.slice(cursorPosition);

			setState((prevState) => ({
				...prevState,
				userInput: textBeforeCursor + character + textAfterCursor,
			}));

			// Setting a timeout to ensure the cursor position is updated after state change
			setTimeout(() => {
				if (inputRef.current) {
					inputRef.current.focus();
					const newCursorPosition = cursorPosition + character.length;
					inputRef.current.setSelectionRange(newCursorPosition, newCursorPosition);
				}
			}, 10);
		}
	};

	const playSound = useCallback((soundEffect: string) => {
		new Audio(soundEffect).play();
	}, []);

	const renderWelcomeScreen = () => (
		<>
			<div className="text-center p-4 mb-6 bg-white shadow-md rounded-md">
				<h1 className="font-bold text-2xl mb-2">{t("story_writing_welcome_message")}</h1>
				<p className="mb-4">{t("Practice your writing skills creating a story")}</p>
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

	const renderFeedback = () => {
		if (errorIndex !== null) {
			let correctPart = state.userInput.slice(0, errorIndex);
			let incorrectPart = state.userInput.slice(errorIndex);
			return (
				<div className="mt-4">
					<span>{correctPart}</span>
					<span className="bg-red-100 border border-red-200 text-red-800">{incorrectPart}</span>
				</div>
			);
		}
		return null;
	};

	const renderIncompleteFeedback = () => {
		if (isIncomplete) {
			return <div className="mt-4 bg-yellow-100 border border-yellow-200 text-yellow-800 p-2">Keep going, you're on the right track!</div>;
		}
		return null;
	};

	const renderCorrectSentenceWithHighlight = () => {
		console.log(errorIndex);
		console.log(errorWordIndices);

		if (errorIndex !== null && errorWordIndices) {
			const [start, end] = errorWordIndices;
			const beforeError = currentSection?.germanText.slice(0, start);
			const errorWord = currentSection?.germanText.slice(start, end);
			const afterError = currentSection?.germanText.slice(end);

			return (
				<div className="mt-4">
					{beforeError}
					<span className="bg-green-100 border border-green-200">{errorWord}</span>
					{afterError}
				</div>
			);
		}
		return null;
	};

	const renderSpecialCharacterButtons = () => (
		<div className="flex space-x-2 mt-2">
			{specialCharacters.map((char, index) => (
				<button key={index} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-1 px-2 rounded" onClick={() => handleSpecialCharacterInput(char)}>
					{char}
				</button>
			))}
		</div>
	);

	const renderStoryChoices = () => (
		<div className="flex space-x-8 m-2">
			{state.showChoices &&
				currentSection?.choices &&
				currentSection.choices.map((choice, index) => (
					<button key={index} className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleChoice(choice.nextSectionId)}>
						{choice.germanText}
					</button>
				))}
		</div>
	);

	const renderStoryProgress = () => {
		return (
			<div className="bg-white border rounded-md p-8 w-full my-4">
				{state.storyProgress.map((sectionId, index) => {
					const section = storyData.find((s) => s.id === sectionId);
					return (
						<div key={index} className="mb-6">
							<p className="text-sm text-gray-800 font-semibold">{section?.germanText}</p>
							<p className="text-sm text-gray-600 italic">{section?.englishTranslation}</p>
						</div>
					);
				})}
			</div>
		);
	};

	const renderStorySection = () => {
		if (!isStoryComplete) {
			<div className="flex flex-col items-center justify-center min-h-[calc(100vh-18rem)] sm:min-h-[calc(100vh-15rem)] bg-gray-100">
				<h1 className="text-2xl text-gray-700 font-bold py-8">{t("Create a Story Writing Exercise")}</h1>
				{renderStoryChoices()}
				{!state.showChoices && (
					<>
						<p className="text-lg">{currentSection?.germanText}</p>
						<input
							type="text"
							className="border border-gray-300 rounded p-2 w-full"
							ref={inputRef}
							value={state.userInput}
							onChange={handleUserInput}
							placeholder={t("type_here")}
							onKeyDown={(event) => {
								if (event.key === "Enter") {
									checkInput();
								}
							}}
						/>
						{renderSpecialCharacterButtons()}
						<button className="mt-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={checkInput}>
							{t("submit")}
						</button>
						{renderFeedback()}
						{renderIncompleteFeedback()}
						{renderCorrectSentenceWithHighlight()}
					</>
				)}
				{state.storyProgress.length > 0 && renderStoryProgress()}
			</div>;
		}
		return null;
	};

	const renderStoryCompletionScreen = () => {
		if (isStoryComplete) {
			return (
				<div className="flex flex-col items-center justify-center min-h-[calc(100vh-18rem)] sm:min-h-[calc(100vh-15rem)] bg-gray-100">
					<div className="text-center p-8 mb-4 bg-green-200 text-cyan-950 rounded-md">
						<p className="font-semibold text-4xl my-4">Congratulations!</p>
						<p className="font-semibold text-2xl">You've completed the story.</p>
					</div>
					{state.storyProgress.length > 0 && renderStoryProgress()}
				</div>
			);
		}
		return null;
	};

	return (
		<Layout>
			{!state.gameStarted && renderWelcomeScreen()}
			{state.gameStarted && renderStorySection()}
			{renderStoryCompletionScreen()}
		</Layout>
	);
};

export default CreateStoryWritingExercise;
