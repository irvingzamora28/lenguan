import React, { useState, useCallback, useEffect } from "react";
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

const CreateStoryWritingExercise: React.FC = () => {
	const { t } = useTranslation();
	const [state, setState] = useState({
		currentSectionId: "start",
		userInput: "",
		storyProgress: [] as string[], // Track IDs of completed sections
		showChoices: false, // To determine when to show choices
		gameStarted: false,
	});
	console.log(storyData);

	const currentSection = storyData.find((section) => section.id === state.currentSectionId);

	const checkInput = useCallback(() => {
		if (state.userInput === currentSection?.germanText) {
			playSound(correctSound);

			const hasChoices = currentSection?.choices && currentSection.choices.length > 0;
			setState((prevState) => ({
				...prevState,
				userInput: "",
				storyProgress: [...prevState.storyProgress, prevState.currentSectionId],
				showChoices: hasChoices ? true : false, // Ensures showChoices is always a boolean
			}));
		} else {
			playSound(incorrectSound);
			setState((prevState) => ({
				...prevState,
				showChoices: false, // Hide choices on incorrect input
			}));
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

	const playSound = useCallback((soundEffect: string) => {
		new Audio(soundEffect).play();
	}, []);

	const renderWelcomeScreen = () => (
		<div className="text-center p-4 mb-4 bg-slate-200">
			<p className="font-semibold text-lg">{t("story_writing_welcome_message")}</p>
			<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setState((prevState) => ({ ...prevState, gameStarted: true }))}>
				{t("start")}
			</button>
		</div>
	);

	const renderStorySection = () => (
		<Layout>
			<div className="flex flex-col items-center justify-center min-h-[calc(100vh-18rem)] sm:min-h-[calc(100vh-15rem)] bg-gray-100">
				<h1 className="text-2xl text-gray-700 font-bold py-8">{t("Create a Story Writing Exercise")}</h1>
				<p className="text-lg">{currentSection?.germanText}</p>
				<input type="text" className="border border-gray-300 rounded p-2 w-full" value={state.userInput} onChange={handleUserInput} placeholder={t("type_here")} />
				<button className="mt-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={checkInput}>
					{t("submit")}
				</button>
				{state.showChoices &&
					currentSection?.choices &&
					currentSection.choices.map((choice, index) => (
						<button key={index} className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleChoice(choice.nextSectionId)}>
							{choice.germanText}
						</button>
					))}
				{state.storyProgress.map((sectionId, index) => {
					const section = storyData.find((s) => s.id === sectionId);
					return (
						<p key={index} className="text-sm text-gray-600">
							{section?.englishTranslation}
						</p>
					);
				})}
			</div>
		</Layout>
	);

	return (
		<div>
			{!state.gameStarted && renderWelcomeScreen()}
			{state.gameStarted && renderStorySection()}
		</div>
	);
};

export default CreateStoryWritingExercise;
