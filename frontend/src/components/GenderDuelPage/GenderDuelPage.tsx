import React, { useState, useEffect } from "react";
import socket from "./../../../socket-server/socket";

const genders = [
	{
		name: "Der",
		color: "blue",
	},
	{
		name: "Die",
		color: "red",
	},
	{
		name: "Das",
		color: "green",
	},
];
const words = [
	{
		word: "Haus",
		gender: "das",
		translation: "house",
		difficulty_level: 1,
		category: "Housing",
	},
	{
		word: "Apfel",
		gender: "der",
		translation: "apple",
		difficulty_level: 1,
		category: "Food & Drinks",
	},
	{
		word: "Katze",
		gender: "die",
		translation: "cat",
		difficulty_level: 1,
		category: "Animals",
	},
];

const getRandomWord = () => {
	const randomIndex = Math.floor(Math.random() * words.length);
    console.log(`random word: ${words[randomIndex].word}`);

	return words[randomIndex];
};

type Word = {
    word: string;
    gender: string;
    translation: string;
    difficulty_level: number;
    category: string;
  };


const GenderDuelPage: React.FC = () => {
    const [currentWord, setCurrentWord] = useState<Word | null>(null);
    const [score, setScore] = useState({ player1: 0, player2: 0 });
    const [gameStatus, setGameStatus] = useState<string | null>(null);
    const [playerNumber, setPlayerNumber] = useState<number | null>(null);
    const [intervalId, setIntervalId] = useState<number | NodeJS.Timer | undefined>(undefined);
    const [correctGender, setCorrectGender] = useState<string | null>(null);

    useEffect(() => {
        setCurrentWord(getRandomWord());
        const interval = setInterval(() => {
            setCurrentWord(getRandomWord());
        }, 10000);
        setIntervalId(interval);

        socket.on("player-assignment", (player: number) => {
            setPlayerNumber(player);
        });

        socket.on("update-score", (updatedScore) => {
            setScore(updatedScore);
        });

        socket.on("game-over", (message: string) => {
            setGameStatus(message);
        });

        return () => {
            clearInterval(interval);
            socket.off("player-assignment");
            socket.off("update-score");
            socket.off("game-over");
        };
    }, []);

    const handleButtonClick = (gender: string) => {
        console.log(`${gender} button clicked`);
        if (currentWord && gender === currentWord.gender) {
            socket.emit("correct-gender-clicked", gender);
            setCorrectGender(gender);
            clearInterval(intervalId);

            setTimeout(() => {
                setCurrentWord(getRandomWord());

                const interval = setInterval(() => {
                    setCurrentWord(getRandomWord());
                    setCorrectGender(null);
                }, 10000);
                console.log(`new word: ${currentWord?.word}`);
                setIntervalId(interval);
            }, 1000);
        }
    };


	return (
		<div className="flex flex-col items-center">
			<div className="d-none bg-green-500 bg-red-500 bg-blue-500 bg-yellow-500"></div>
			{playerNumber !== null && <h2 className="text-2xl font-semibold mb-4">{playerNumber === 0 ? "Spectator" : `Player ${playerNumber}`}</h2>}
			<h1 className="text-4xl font-bold mb-8">{gameStatus ? gameStatus : `Press the correct gender for ${currentWord?.word}`}</h1>
			<div className="flex flex-wrap justify-center">
				{genders.map((gender) => (
					<button
						key={gender.color}
                        className={`bg-${gender.color.toLowerCase()}-500 w-32 h-32 m-4 rounded-lg focus:outline-none hover:bg-${gender.color.toLowerCase()}-600 ${correctGender === gender.name.toLowerCase() ? "animate-bounce" : ""}`}
						onClick={() => handleButtonClick(gender.name.toLowerCase())}
						disabled={!!gameStatus}
					>
						{gender.name}
					</button>
				))}
			</div>
			<div className="mt-8">
				<p>Player 1: {score.player1}</p>
				<p>Player 2: {score.player2}</p>
			</div>
		</div>
	);
};

export default GenderDuelPage;
