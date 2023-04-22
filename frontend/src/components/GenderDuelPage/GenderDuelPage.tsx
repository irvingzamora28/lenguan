import React, { useState, useEffect } from "react";
import socket from "./../../../socket-server/socket";
import correctSound from "../../assets/audio/correct-choice.mp3";
import incorrectSound from "../../assets/audio/incorrect-choice.mp3";
import "../../assets/scss/components/GenderDuelPage.scss";
import { FaMars, FaVenus, FaNeuter } from "react-icons/fa";

const genders = [
	{
		name: "Der",
		color: "blue",
		icon: <FaMars />,
	},
	{
		name: "Die",
		color: "red",
		icon: <FaVenus />,
	},
	{
		name: "Das",
		color: "green",
		icon: <FaNeuter />,
	},
];

type Word = {
	word: string;
	gender: string;
	translation: string;
	difficulty_level: number;
	category: string;
};

type GameStatus = {
	message: string;
	active: boolean;
	sound: string | null;
};

const GenderDuelPage: React.FC = () => {
	const [currentWord, setCurrentWord] = useState<Word | null>(null);
	const [score, setScore] = useState({ player1: 0, player2: 0 });
	const [gameStatus, setGameStatus] = useState<GameStatus>({ message: "", active: true, sound: null });
	const [playerNumber, setPlayerNumber] = useState<number | null>(null);
	const [correctGender, setCorrectGender] = useState<string | null>(null);
	const [incorrectGender, setIncorrectGender] = useState<string | null>(null);
	const [disappearing, setDisappearing] = useState(false);
	const [gameStarted, setGameStarted] = useState(false);
	const [waitingPlayer, setWaitingPlayer] = useState<number | null>(null);

	const resetAnimation = () => {
		setCorrectGender(null);
		setIncorrectGender(null);
	};

	const resetDisappearing = () => {
		setDisappearing(false);
	};

	useEffect(() => {
		if (gameStatus.sound) {
			const audio = new Audio(gameStatus.sound);
			audio.play();
		}
		setGameStatus({ message: ``, active: true, sound: null });
	}, [gameStatus.sound]);

	useEffect(() => {
		socket.on("start-game", () => {
			setGameStarted(true);
		});

		socket.on("new-word", (newWord: Word) => {
			setCurrentWord(newWord);
		});

		socket.on("player-assignment", (player: number) => {
			setPlayerNumber(player);
			if (player === 1) {
				setWaitingPlayer(2);
			} else if (player === 2) {
				setWaitingPlayer(1);
			}
		});

		socket.on("update-score", (updatedScore) => {
			setScore(updatedScore);
		});

		socket.on("game-over", (message: string) => {
			setGameStatus({ message: message, active: false, sound: correctSound });
		});

		return () => {
			socket.off("start-game");
			socket.off("player-assignment");
			socket.off("new-word");
			socket.off("update-score");
			socket.off("game-over");
			socket.off("both-players-connected");
		};
	}, []);

	const handleButtonClick = (gender: string) => {
		console.log(`${gender} button clicked`);
		if (currentWord && gender === currentWord.gender) {
			socket.emit("correct-gender-clicked", gender);
			setCorrectGender(gender);
			setDisappearing(true);

			setGameStatus({ message: ``, active: true, sound: correctSound });
		} else {
			console.log(`Incorrect`);
			setIncorrectGender(gender);
			setGameStatus({ message: ``, active: true, sound: incorrectSound });
		}
	};

	const handleStartButtonClick = () => {
		console.log("Start button clicked");
		console.log("playerNumber: ", playerNumber);

		socket.emit("start-game");
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-t from-blue-400 to-blue-100">
			{!gameStarted && (
				<>
                    <span className="gender_duel__subtitle font-semibold m-4 text-white">PLAYER {playerNumber}</span>
					<button
						className="flex items-center shadow-box justify-center h-24 w-64 drop-shadow-xl rounded-lg px-8 py-4 overflow-hidden group bg-yellow-400 relative hover:bg-gradient-to-r hover:from-yellow-400 hover:to-yellow-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-yellow-400 transition-all ease-out duration-300"
						onClick={handleStartButtonClick}
					>
						<span className="absolute right-0 w-12 h-44 -mt-12 transition-all duration-1000 transform translate-x-16 bg-white opacity-10 rotate-12 group-hover:-translate-x-72 ease"></span>
						<span className="relative gender_duel__text-shadow font-bold">START</span>
					</button>
				</>
			)}
			{gameStarted && (
				<>
					<div className="d-none bg-red-500 active:bg-red-700 from-red-400 to-red-500"></div>
					<div className="d-none bg-blue-500 active:bg-blue-700 from-blue-400 to-blue-500"></div>
					<div className="d-none bg-green-500 active:bg-green-700 from-green-400 to-green-500"></div>
					{playerNumber !== null && <h2 className="text-2xl font-semibold mb-4 text-white">{playerNumber === 0 ? "Spectator" : `Player ${playerNumber}`}</h2>}
					<h1 className={`gender_duel__title ${disappearing ? "animate-disappear" : ""}`} onAnimationEnd={resetDisappearing}>
						{!gameStatus.active ? gameStatus.message : `${currentWord?.word}`}
					</h1>
					<div className="flex flex-wrap justify-center">
						{genders.map((gender) => (
							<button
								key={gender.color}
								className={`bg-${gender.color.toLowerCase()}-500 w-16 h-16 md:w-32 md:h-32 m-4 rounded-lg focus:outline-none hover:bg-${gender.color.toLowerCase()}-600 hover:shadow-lg active:bg-${gender.color.toLowerCase()}-700 active:scale-95 ${
									correctGender === gender.name.toLowerCase() ? "animate-correct" : incorrectGender === gender.name.toLowerCase() ? "animate-incorrect" : ""
								} transition duration-300 ease-in-out shadow-box bg-gradient-to-t from-${gender.color.toLowerCase()}-400 to-${gender.color.toLowerCase()}-500`}
								onClick={() => handleButtonClick(gender.name.toLowerCase())}
								onAnimationEnd={resetAnimation}
								disabled={!gameStatus.active}
							>
								<div className="flex flex-row justify-center items-center text-lg md:text-4xl">
									{gender.icon}
									<span className="font-semibold">{gender.name}</span>
								</div>
							</button>
						))}
					</div>
					<div className="mt-8 text-white">
						<p className="font-semibold">Player 1: {score.player1}</p>
						<p className="font-semibold">Player 2: {score.player2}</p>
					</div>
				</>
			)}
		</div>
	);
};

export default GenderDuelPage;
