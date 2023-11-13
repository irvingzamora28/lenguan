import React, { Suspense, useCallback, useEffect, useRef, useState } from "react";
import correctSound from "../../../assets/audio/correct-choice.mp3";
import incorrectSound from "../../../assets/audio/incorrect-choice.mp3";
import Layout from "../../Layout/Layout";
import TextToSpeechPlayer from "../../Items/Misc/TextToSpeechPlayer";
import { useTranslation } from "react-i18next";

interface Exercise {
	audio: string;
	options: string[];
	correctAnswer: string;
}

const initialExercises: Exercise[] = [
	{
		audio: "/src/assets/courses/german/_shared/exercises/lesson1/audio/Hallo.mp3",
		correctAnswer: "Hallo",
		options: ["Hallo", "Büro", "Hütte", "Ich"],
	},
	{
		audio: "/src/assets/courses/german/_shared/exercises/lesson1/audio/Bitte.mp3",
		correctAnswer: "Bitte",
		options: ["Bitte", "Tür", "Hütte", "Ich"],
	},
	{
		audio: "/src/assets/courses/german/_shared/exercises/lesson1/audio/Guten_Tag.mp3",
		correctAnswer: "Guten Tag",
		options: ["Entschuldigung", "Guten Tag", "Hallo", "Wunderbar"],
	},
	{
		audio: "/src/assets/courses/german/_shared/exercises/lesson1/audio/Wunderbar.mp3",
		correctAnswer: "Wunderbar",
		options: ["Wunderbar", "Entschuldigung", "Guten Tag", "grün"],
	},
	{
		audio: "/src/assets/courses/german/_shared/exercises/lesson1/audio/Hütte.mp3",
		correctAnswer: "Hütte",
		options: ["Hütte", "Büro", "Tür", "Ich"],
	},
	{
		audio: "/src/assets/courses/german/_shared/exercises/lesson1/audio/Büro.mp3",
		correctAnswer: "Büro",
		options: ["Büro", "Tür", "Hallo", "Ich"],
	},
	{
		audio: "/src/assets/courses/german/_shared/exercises/lesson1/audio/Tür.mp3",
		correctAnswer: "Tür",
		options: ["Tür", "Büro", "Hütte", "Ich"],
	},
	{
		audio: "/src/assets/courses/german/_shared/exercises/lesson1/audio/Entschuldigung.mp3",
		correctAnswer: "Entschuldigung",
		options: ["Entschuldigung", "Wunderbar", "Guten Tag", "grün"],
	},
	{
		audio: "/src/assets/courses/german/_shared/exercises/lesson1/audio/Ich.mp3",
		correctAnswer: "Ich",
		options: ["Ich", "Hallo", "Hütte", "Büro"],
	},
	{
		audio: "/src/assets/courses/german/_shared/exercises/lesson1/audio/grün.mp3",
		correctAnswer: "grün",
		options: ["grün", "Wunderbar", "Guten Tag", "Tür"],
	},
];

const shuffleArray = (array: any[]) => {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
};

interface ProgressBarProps {
	progress: number;
	total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, total }) => {
	const percentage = (progress / total) * 100;

	return (
		<div className="w-full bg-gray-200 rounded overflow-hidden relative">
			<div className="bg-green-500 h-4 transition-width duration-500 ease-in-out" style={{ width: `${percentage}%` }}></div>
			<div className="absolute w-full flex justify-center items-center h-4">
				<span className="text-xs font-bold text-white">{`${progress}/${total}`}</span>
			</div>
		</div>
	);
};

const ListeningExercise: React.FC = () => {
    const { t } = useTranslation();
	const [state, setState] = useState({
		exerciseIndex: 0,
		currentExercise: [] as Exercise[],
		progress: 0,
		gameStarted: false,
		hasSelectedAnswer: false,
	});

	const playSound = (soundEffect: string) => {
		const audio = new Audio(soundEffect);
		audio.play();
	};

	const { exerciseIndex, currentExercise, progress, gameStarted, hasSelectedAnswer } = state;
	const [selectedAnswer, setSelectedAnswer] = useState("");

	const updateState = (newState: Partial<typeof state>) => setState((prevState) => ({ ...prevState, ...newState }));

	const checkAnswer = useCallback(
		(answer: string) => {
			return () => {
				setSelectedAnswer(answer);
				updateState({ hasSelectedAnswer: true });
				if (currentExercise[exerciseIndex] && answer === currentExercise[exerciseIndex].correctAnswer) {
					playSound(correctSound);
					setTimeout(() => {
						updateState({
							exerciseIndex: exerciseIndex + 1,
							progress: progress + 1,
						});
						setSelectedAnswer("");
						updateState({ hasSelectedAnswer: false });
					}, 1000);
				} else {
					playSound(incorrectSound);
				}
			};
		},
		[exerciseIndex, currentExercise, progress]
	);

	useEffect(() => {
		const shuffledExercises = JSON.parse(JSON.stringify(initialExercises)); // Deep copy
		shuffledExercises.forEach((exercise: Exercise) => {
			exercise.options = shuffleArray(exercise.options);
		});
		updateState({ currentExercise: shuffledExercises });
	}, []);

	// TODO: Add ability to set time limit
	return (
			<Layout>
				{!gameStarted && (
					<>
						<div className="text-center p-4 mb-4 bg-slate-200">
							<p className="font-semibold text-lg sm:text-base">{t("welcome_message")}</p>
							<p>{t('welcome_instructions', { ns: 'listening_exercise' })}</p>
						</div>
						<div className="flex flex-col items-center justify-center min-h-[calc(100vh-18rem)] sm:min-h-[calc(100vh-15rem)] bg-gray-100">
							<button
								className="items-center mx-auto shadow-box justify-center h-24 w-64 sm:h-20 sm:w-56 drop-shadow-xl rounded-lg px-8 py-4 overflow-hidden group bg-yellow-400 relative hover:bg-gradient-to-r from-yellow-400 to-yellow-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-yellow-400 transition-all ease-out duration-300"
								onClick={() => updateState({ gameStarted: true })}
							>
								<span className="absolute right-0 w-12 h-44 -mt-12 sm:w-8 sm:h-32 sm:-mt-8 transition-all duration-1000 transform translate-x-16 bg-white opacity-10 rotate-12 group-hover:-translate-x-72 ease"></span>
								<span className="relative gender_duel__text-shadow text-4xl sm:text-3xl font-bold">{t("start")}</span>
							</button>
						</div>
					</>
				)}

				{gameStarted && currentExercise[exerciseIndex] && (
					<>
						<div className="flex flex-col items-center justify-center min-h-[calc(100vh-18rem)] sm:min-h-[calc(100vh-15rem)] bg-gray-100">
							<div className="w-full max-w-md mx-auto">
								<h1 className="text-2xl font-bold mb-4">Match the Audio</h1>
								<div className="text-center p-4 mb-4 bg-slate-200 border-l-4 border-slate-500">
									<p>Listen carefully and select the word or phrase you hear. You can replay the audio if needed.</p>
								</div>
								<TextToSpeechPlayer autoplay mp3File={currentExercise[exerciseIndex]?.audio} />
								<div className="mt-4">
									{currentExercise[exerciseIndex].options.map((option, index) => (
										<button
											key={index}
											className={`block w-full p-3 mb-4 text-left text-lg font-medium rounded-lg border border-primary-600 shadow-md transition duration-300 ease-in-out ${
												option === selectedAnswer ? "bg-primary-300 text-primary-800 hover:bg-primary-300" : "bg-primary-100 hover:bg-primary-300 text-slate-600 hover:text-slate-800"
											} `}
											onClick={checkAnswer(option)}
										>
											{option}
										</button>
									))}
								</div>

								<div className="mt-4 py-2">
									<ProgressBar progress={progress} total={currentExercise.length} />
									<p className="my-2">
										Progress: {progress} / {currentExercise.length}
									</p>
								</div>
								{hasSelectedAnswer && (
									<div className={`text-center p-4 mb-4 ${selectedAnswer === currentExercise[exerciseIndex]?.correctAnswer ? "bg-green-100 border-green-500" : "bg-red-100 border-red-500"}`}>
										<p>{selectedAnswer === currentExercise[exerciseIndex]?.correctAnswer ? "Correct! Great job." : "Oops! That's not quite right."}</p>
									</div>
								)}
							</div>
						</div>
					</>
				)}

				{!currentExercise[exerciseIndex] && (
					<div className="flex flex-col items-center justify-center min-h-[calc(100vh-18rem)] sm:min-h-[calc(100vh-15rem)] bg-gray-100">
						<div className="text-center p-12 mb-4 bg-primary-100 border-l-4 border-r-4 border-primary-500">
							<p className="font-extrabold text-4xl pb-8">Exercise Completed!</p>
							<p className="font-normal text-xl">
								You got {progress} out of {currentExercise.length} correct. {progress === currentExercise.length ? "Amazing work!" : "Keep practicing to improve."}
							</p>
						</div>
					</div>
				)}
			</Layout>
	);
};

export default ListeningExercise;
