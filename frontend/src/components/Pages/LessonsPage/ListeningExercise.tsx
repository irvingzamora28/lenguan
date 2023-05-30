import React, { useEffect, useState } from "react";
import correctSound from "../../../assets/audio/correct-choice.mp3";
import asd from "../../../assets/audio/exercises/german/lesson1/Hallo.mp3";
import incorrectSound from "../../../assets/audio/incorrect-choice.mp3";

interface Exercise {
	audio: string;
	options: string[];
	correctAnswer: string;
}

const initialExercises: Exercise[] = [
	{
		audio: "/src/assets/audio/exercises/german/lesson1/Hallo.mp3",
		correctAnswer: "Hallo",
		options: ["Hallo", "Büro", "Hütte", "Ich"],
	},
	{
		audio: "/src/assets/audio/exercises/german/lesson1/Bitte.mp3",
		correctAnswer: "Bitte",
		options: ["Bitte", "Tür", "Hütte", "Ich"],
	},
	{
		audio: "/src/assets/audio/exercises/german/lesson1/Guten_Tag.mp3",
		correctAnswer: "Guten Tag",
		options: ["Entschuldigung", "Guten Tag", "Hallo", "Wunderbar"],
	},
	{
		audio: "/src/assets/audio/exercises/german/lesson1/Wunderbar.mp3",
		correctAnswer: "Wunderbar",
		options: ["Wunderbar", "Entschuldigung", "Guten Tag", "grün"],
	},
	{
		audio: "/src/assets/audio/exercises/german/lesson1/Hütte.mp3",
		correctAnswer: "Hütte",
		options: ["Hütte", "Büro", "Tür", "Ich"],
	},
	{
		audio: "/src/assets/audio/exercises/german/lesson1/Büro.mp3",
		correctAnswer: "Büro",
		options: ["Büro", "Tür", "Hallo", "Ich"],
	},
	{
		audio: "/src/assets/audio/exercises/german/lesson1/Tür.mp3",
		correctAnswer: "Tür",
		options: ["Tür", "Büro", "Hütte", "Ich"],
	},
	{
		audio: "/src/assets/audio/exercises/german/lesson1/Entschuldigung.mp3",
		correctAnswer: "Entschuldigung",
		options: ["Entschuldigung", "Wunderbar", "Guten Tag", "grün"],
	},
	{
		audio: "/src/assets/audio/exercises/german/lesson1/Ich.mp3",
		correctAnswer: "Ich",
		options: ["Ich", "Hallo", "Hütte", "Büro"],
	},
	{
		audio: "/src/assets/audio/exercises/german/lesson1/grün.mp3",
		correctAnswer: "grün",
		options: ["grün", "Wunderbar", "Guten Tag", "Tür"],
	},
];

const ListeningExercise: React.FC = () => {
	const [exerciseIndex, setExerciseIndex] = useState(0);
	const [currentExercise, setCurrentExercise] = useState<Exercise[]>([]);
    const [soundEffect, setSoundEffect] = useState<string | null>(null);
    const [selectedAnswer, setSelectedAnswer] = useState<string>('');

	const checkAnswer = (selectedAnswer: string) => {
        setSelectedAnswer(selectedAnswer);

		if (currentExercise[exerciseIndex] && selectedAnswer === currentExercise[exerciseIndex].correctAnswer) {
			setSoundEffect(correctSound);
			setExerciseIndex((prevIndex) => prevIndex + 1);
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
		setCurrentExercise(initialExercises);
	}, []);

	if (!currentExercise[exerciseIndex]) {
		return (
			<div>
				<h1>Listening Exercise</h1>
				<p>No more exercises!</p>
			</div>
		);
	}

	return (
		<div className="w-full max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Match the Audio</h1>
      <audio controls src={currentExercise[exerciseIndex].audio}>Your browser does not support the audio element.</audio>
      <div className="mt-4">
        {currentExercise[exerciseIndex].options.map((option, index) => (
          <button
            key={index}
            className={`block w-full p-2 mb-2 text-left ${option === selectedAnswer ? 'bg-blue-200' : 'bg-white'} border border-gray-200 rounded`}
            onClick={() => checkAnswer(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
	);
};

export default ListeningExercise;
