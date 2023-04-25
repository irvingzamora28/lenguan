import React, { useState, useEffect, useRef } from "react";
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

type Score = {
	[playerNumber: string]: number;
};

const GenderDuelPage: React.FC = () => {
	const [word, setWord] = useState<Word | null>(null);
	const [score, setScore] = useState<Score>({});
	const [playerNumber, setPlayerNumber] = useState(0);
	const [correctGender, setCorrectGender] = useState<string | null>(null);
	const [incorrectGender, setIncorrectGender] = useState<string | null>(null);
	const [gameStatus, setGameStatus] = useState("waiting");
	const [username, setUsername] = useState<string | null>(null);
	const [appearing, setAppearing] = useState(false);
	const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);
	const [soundEffect, setSoundEffect] = useState<string | null>(null);

	const resetAnimation = () => {
		setCorrectGender(null);
		setIncorrectGender(null);
		setAppearing(false);
	};

	useEffect(() => {
		const getUsername = () => {
			const userInput = prompt("Please enter your username or leave it empty to join as a guest:");
			if (userInput === "") {
				return `Guest_${Math.floor(Math.random() * 1000)}`;
			} else {
				return userInput;
			}
		};

		const tempUsername = getUsername();
		setUsername(tempUsername);
		// You can use tempUsername while connecting to the socket
	}, []);

	useEffect(() => {
		if (username) {
			socket.emit("register-player", username);
		}
	}, [username]);

	useEffect(() => {
		if (soundEffect) {
			const audio = new Audio(soundEffect);
			audio.play();
		}
		setSoundEffect(null);
	}, [soundEffect]);

	useEffect(() => {
		socket.on("player-assignment", (assignedPlayerNumber: number) => {
			setPlayerNumber(assignedPlayerNumber);
		});

		socket.on("new-word", (newWord: Word) => {
			setWord(newWord);
		});

		socket.on("update-score", (updatedScore: Score) => {
            console.log(score);

			setScore(updatedScore);
		});

		socket.on("start-game", () => {
			setGameStatus("playing");
		});

		socket.on("game-over", (message: string) => {
			setGameStatus("game-over");
			alert(message);
		});

		return () => {
			socket.off("player-assignment");
			socket.off("new-word");
			socket.off("update-score");
			socket.off("start-game");
			socket.off("game-over");
		};
	}, [socket]);

	const handleGenderClick = (gender: string) => {
		console.log(`${gender} button clicked`);
		if (word && word.gender === gender) {
			socket.emit("correct-gender-clicked", gender);
			setCorrectGender(gender);
			setSoundEffect(correctSound);

			if ("speechSynthesis" in window) {
				const utterance = new SpeechSynthesisUtterance(`${gender} ${word.word}`);
				speechSynthesisRef.current = utterance;
				utterance.lang = "de-DE";
				utterance.rate = 0.8;
				speechSynthesis.speak(utterance);
			} else {
				console.log("Text-to-speech not supported in this browser");
			}
		} else {
			console.log(`Incorrect`);
			setIncorrectGender(gender);
			setSoundEffect(incorrectSound);
		}
	};

	const handleStartGame = () => {
		socket.emit("start-game");
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-t from-blue-400 to-blue-100">
			{gameStatus !== "playing" && <h1 className="gender_duel__title text-center">Gender Duel</h1>}
			{playerNumber === 0 ? (
				<p>Game is full. Please wait for an available slot.</p>
			) : (
				<>
					{playerNumber !== null && <h2 className="gender_duel__subtitle font-semibold m-4 text-white">{playerNumber === 0 ? "Spectator" : `Player ${username}`}</h2>}
					{gameStatus === "waiting" && (
						<button
							className="flex items-center shadow-box justify-center h-24 w-64 drop-shadow-xl rounded-lg px-8 py-4 overflow-hidden group bg-yellow-400 relative hover:bg-gradient-to-r hover:from-yellow-400 hover:to-yellow-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-yellow-400 transition-all ease-out duration-300"
							onClick={handleStartGame}
						>
							<span className="absolute right-0 w-12 h-44 -mt-12 transition-all duration-1000 transform translate-x-16 bg-white opacity-10 rotate-12 group-hover:-translate-x-72 ease"></span>
							<span className="relative gender_duel__text-shadow font-bold">START</span>
						</button>
					)}
					{gameStatus === "playing" && word && (
						<>
							<div className="d-none bg-red-500 active:bg-red-700 from-red-400 to-red-500"></div>
							<div className="d-none bg-blue-500 active:bg-blue-700 from-blue-400 to-blue-500"></div>
							<div className="d-none bg-green-500 active:bg-green-700 from-green-400 to-green-500"></div>
							<h1 className={`gender_duel__title text-center ${appearing ? "animate-appear" : ""}`} onAnimationEnd={resetAnimation}>
								{gameStatus !== "playing" ? gameStatus : `${word.word} (${word.translation})`}
							</h1>
							<div className="flex flex-wrap justify-center w-4/5">
								{genders.map((gender) => (
									<button
										key={gender.color}
										className={`${
											correctGender === gender.name.toLowerCase() ? "animate-grow" : correctGender !== null && correctGender !== gender.name.toLowerCase() ? "hidden" : ""
										} bg-${gender.color.toLowerCase()}-500 w-16 h-16 md:w-32 md:h-32 m-4 rounded-lg focus:outline-none hover:bg-${gender.color.toLowerCase()}-600 hover:shadow-lg active:bg-${gender.color.toLowerCase()}-700 active:scale-95 ${
											correctGender === gender.name.toLowerCase() ? "animate-correct" : incorrectGender === gender.name.toLowerCase() ? "animate-incorrect" : ""
										} transition duration-300 ease-in-out shadow-box bg-gradient-to-t from-${gender.color.toLowerCase()}-400 to-${gender.color.toLowerCase()}-500`}
										onClick={() => handleGenderClick(gender.name.toLowerCase())}
										onAnimationEnd={resetAnimation}
										disabled={gameStatus !== "playing"}
									>
										<div className="flex flex-row justify-center items-center text-lg md:text-4xl">
											{gender.icon}
											<span className="font-semibold">{gender.name}</span>
										</div>
									</button>
								))}
							</div>
						</>
					)}
					<div className="mt-8 text-white">
						<h2 className="">Score</h2>
						{Object.entries(score).map(([player, playerScore]) => (
							<p key={player} className="font-semibold">
								{player}: {playerScore}
							</p>
						))}
					</div>
				</>
			)}
		</div>
	);
};

export default GenderDuelPage;
