import React, { useEffect, useState } from "react";
import correctSound from "../../../assets/audio/correct-choice.mp3";
import incorrectSound from "../../../assets/audio/incorrect-choice.mp3";
import Layout from "../../Layout/Layout";
import TextToSpeechPlayer from "../../Items/Misc/TextToSpeechPlayer";

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

const ListeningExercise: React.FC = () => {
	const [exerciseIndex, setExerciseIndex] = useState(0);
	const [currentExercise, setCurrentExercise] = useState<Exercise[]>([]);
	const [soundEffect, setSoundEffect] = useState<string | null>(null);
	const [selectedAnswer, setSelectedAnswer] = useState<string>("");
	const [progress, setProgress] = useState<number>(0);
	const [gameStarted, setGameStarted] = useState<boolean>(false);

	const checkAnswer = (selectedAnswer: string) => {
		setSelectedAnswer(selectedAnswer);

		if (currentExercise[exerciseIndex] && selectedAnswer === currentExercise[exerciseIndex].correctAnswer) {
			setSoundEffect(correctSound);
            setTimeout(() => {
                setExerciseIndex((prevIndex) => prevIndex + 1);
                setSelectedAnswer("");
                setProgress((prevProgress) => prevProgress + 1);
			}, 1000); // wait for 1 second before playing the next audio
		} else {
			setSoundEffect(incorrectSound);
		}
	};

	useEffect(() => {
		if (soundEffect) {
			const audio = new Audio(soundEffect);
			audio.play();
		}
		setSoundEffect(null);
	}, [soundEffect]);

	useEffect(() => {
		const shuffledExercises = JSON.parse(JSON.stringify(initialExercises)); // Deep copy
		shuffledExercises.forEach((exercise: Exercise) => {
			exercise.options = shuffleArray(exercise.options);
		});
		setCurrentExercise(shuffledExercises);
	}, []);

	// TODO: Add ability to set time limit
	return (
		<Layout>
			{!gameStarted ? (
				<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
					<button
						className="items-center mx-auto shadow-box justify-center h-24 w-64 drop-shadow-xl rounded-lg px-8 py-4 overflow-hidden group bg-yellow-400 relative hover:bg-gradient-to-r hover:from-yellow-400 hover:to-yellow-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-yellow-400 transition-all ease-out duration-300"
						onClick={() => setGameStarted(true)}
					>
						<span className="absolute right-0 w-12 h-44 -mt-12 transition-all duration-1000 transform translate-x-16 bg-white opacity-10 rotate-12 group-hover:-translate-x-72 ease"></span>
						<span className="relative gender_duel__text-shadow text-4xl font-bold">START</span>
					</button>
				</div>
			) : (
				<>
					{!currentExercise[exerciseIndex] ? (
						<div>
							<h1>Listening Exercise</h1>
							<p>No more exercises!</p>
						</div>
					) : (
						<>
							<div className="w-full max-w-md mx-auto">
								<h1 className="text-2xl font-bold mb-4">Match the Audio</h1>
                                <TextToSpeechPlayer autoplay mp3File={currentExercise[exerciseIndex]?.audio} ></TextToSpeechPlayer>
								<div className="mt-4">
									{currentExercise[exerciseIndex].options.map((option, index) => (
										<button
											key={index}
											className={`block w-full p-2 mb-2 text-left ${option === selectedAnswer ? "bg-primary-200" : "bg-backgroundalt"} border border-gray-200 rounded`}
											onClick={() => checkAnswer(option)}
										>
											{option}
										</button>
									))}
								</div>
								<div className="mt-4 py-2">
									<div className="w-full bg-backgroundalt border border-gray-200 rounded">
										<div className="h-2 bg-primary-600 rounded" style={{ width: `${(progress / currentExercise.length) * 100}%` }} />
									</div>
									<p className="my-2">
										Progress: {progress} / {currentExercise.length}
									</p>
								</div>
							</div>
						</>
					)}
					{/* your existing code... */}
				</>
			)}
		</Layout>
	);
};

export default ListeningExercise;
