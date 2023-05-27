import React, { useState, useEffect, useRef } from "react";
import socket from "../../../../socket-server/socket";
import correctSound from "../../../assets/audio/correct-choice.mp3";
import incorrectSound from "../../../assets/audio/incorrect-choice.mp3";
import "../../../assets/scss/components/GenderDuelPage.scss";
import { FaMars, FaVenus, FaNeuter } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

interface Player {
	id: string;
	name: string;
	score: number;
}

type Players = {
	[players: string]: Player;
};

const GenderDuelPage: React.FC = () => {
	const [word, setWord] = useState<Word | null>(null);
	const [players, setPlayers] = useState<Players>({});
	const [playerNumber, setPlayerNumber] = useState<number | null>(null);
	const [correctGender, setCorrectGender] = useState<string | null>(null);
	const [incorrectGender, setIncorrectGender] = useState<string | null>(null);
	const [gameStatus, setGameStatus] = useState("waiting");
	const [username, setUsername] = useState<string | null>(null);
	const [appearing, setAppearing] = useState(false);
	const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);
	const [soundEffect, setSoundEffect] = useState<string | null>(null);
	const [maxPlayers, setMaxPlayers] = useState<number | null>(null);
	const [connectedPlayers, setConnectedPlayers] = useState<number>(0);
	const usernameInput = useRef<HTMLInputElement>(null);
	const passwordInput = useRef<HTMLInputElement>(null);

	const resetAnimation = () => {
		setCorrectGender(null);
		setIncorrectGender(null);
		setAppearing(false);
	};

	useEffect(() => {
		if (username) {
			socket.emit("register-player", username);
			console.log(`emited register-player with username: ${username}`);
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
		console.log(`gameStatus changed to ${gameStatus}`);
	}, [gameStatus]);

	useEffect(() => {
		socket.on("player-assignment", (assignedData: { playerNumber: number; connectedPlayers: number; maxPlayers: number }) => {
			const { playerNumber, connectedPlayers, maxPlayers } = assignedData;
			setPlayerNumber(playerNumber);
			setMaxPlayers(maxPlayers);
			setConnectedPlayers(connectedPlayers);
			console.log(`playerNumber: ${playerNumber}`);
			console.log(`Number of players currently in the game: ${connectedPlayers}`);
			console.log(`Max players: ${maxPlayers}`);

			if (playerNumber === 0) {
				setGameStatus("waiting");
			} else if (connectedPlayers < maxPlayers) {
				setGameStatus("waiting-for-opponent");
				console.log("waiting for opponent");
				console.log(`gameStatus: ${gameStatus}`);
			} else {
				setGameStatus("ready");
			}
			console.log(`gameStatus: ${gameStatus}`);
		});

		socket.on("new-word", (newWord: Word) => {
			setWord(newWord);
		});

		socket.on("update-score", (players: Players) => {
			console.log(players);
			setPlayers(players);
		});

		socket.on("start-game", () => {
			setGameStatus("playing");
		});

		socket.on("game-over", (message: string) => {
			setGameStatus("game-over");
			alert(message);
		});

		socket.on("game-ready", () => {
			setGameStatus("ready");
		});

		return () => {
			socket.off("player-assignment");
			socket.off("new-word");
			socket.off("update-score");
			socket.off("start-game");
			socket.off("game-over");
			socket.off("game-ready");
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

	const handleUsernameSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const usernameValue = usernameInput.current?.value;
		if (usernameValue && usernameValue.trim() !== "") {
			setUsername(usernameValue);
		} else {
			toast.error("Please enter a valid username or join as a guest.", {
				position: toast.POSITION.TOP_CENTER,
			});
		}
	};

    const handleLogin = (e: React.FormEvent) => {

        e.preventDefault();
        const usernameValue = usernameInput.current?.value;
        const passwordValue = passwordInput.current?.value;
        if (usernameValue && usernameValue.trim() !== "" && passwordValue && passwordValue.trim() !== "") {

        } else {
            toast.error("Please enter a valid username or join as a guest.", {
                position: toast.POSITION.TOP_CENTER,
            });
        }
    };

	const handleEnterAsGuest = () => {
		setUsername(`Guest_${Math.floor(Math.random() * 1000)}`);
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-t from-blue-400 to-blue-100">
			<ToastContainer />
			{gameStatus !== "playing" && <h1 className="gender_duel__title text-center">Gender Duel</h1>}
			{playerNumber === 0 ? (
				<p>Game is full. Please wait for an available slot.</p>
			) : (
				<>
					{username === null ? (
						<div className="flex flex-col items-center">
							<h2 className="text-2xl font-bold mb-4 text-white">Enter your username and password or join as a guest</h2>
							<form className="flex flex-col items-center mb-4" onSubmit={handleUsernameSubmit}>
								<label className="text-white mb-2" htmlFor="usernameInput">
									Username
								</label>
								<input id="usernameInput" type="text" ref={usernameInput} placeholder="Username" className="w-full p-2 mb-2 text-black border-2 border-white rounded-md focus:outline-none focus:border-yellow-400" />
								<label className="text-white mb-2" htmlFor="passwordInput">
									Password
								</label>
								<input id="passwordInput" type="password" ref={passwordInput} placeholder="Password" className="w-full p-2 mb-2 text-black border-2 border-white rounded-md focus:outline-none focus:border-yellow-400" />
								<button
									type="submit"
									className="bg-red-500 text-white font-semibold px-6 py-2 rounded-lg hover:bg-red-600 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 transition-all ease-out duration-300"
									onClick={handleLogin}
								>
									Login
								</button>
							</form>
							<button
								onClick={handleEnterAsGuest}
								className="bg-red-500 text-white font-semibold px-6 py-2 rounded-lg hover:bg-red-600 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 hover:bg-gradient-to-r hover:from-red-400 hover:to-red-400 hover:ring-2 hover:ring-offset-2 hover:ring-red-400 transition-all ease-out duration-300"
							>
								<span className="absolute right-0 w-12 h-44 -mt-12 transition-all duration-1000 transform translate-x-16 bg-white opacity-10 rotate-12 group-hover:-translate-x-72 ease"></span>
								<span className="relative gender_duel__text-shadow text-xl font-bold">Enter as a guest</span>
							</button>
						</div>
					) : (
						<>
							{playerNumber !== null && <h2 className="gender_duel__subtitle font-semibold m-4 text-white">{playerNumber === 0 ? "Spectator" : `Player ${username}`}</h2>}
							{gameStatus === "ready" && (
								<>
									<button
										className="flex items-center shadow-box justify-center h-24 w-64 drop-shadow-xl rounded-lg px-8 py-4 overflow-hidden group bg-yellow-400 relative hover:bg-gradient-to-r hover:from-yellow-400 hover:to-yellow-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-yellow-400 transition-all ease-out duration-300"
										onClick={handleStartGame}
									>
										<span className="absolute right-0 w-12 h-44 -mt-12 transition-all duration-1000 transform translate-x-16 bg-white opacity-10 rotate-12 group-hover:-translate-x-72 ease"></span>
										<span className="relative gender_duel__text-shadow text-4xl font-bold">START</span>
									</button>
									<p className="text-2xl font-semibold m-4 text-white">GAME READY</p>
								</>
							)}
							{gameStatus === "waiting-for-opponent" && <p className="text-2xl font-semibold m-4 text-white">Waiting for the opponent...</p>}
						</>
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
					{gameStatus === "playing" && (
						<div className="mt-8 text-maintextalt">
							<h2 className="">Score</h2>
							{Object.entries(players).map(([id, player]) => (
								<p key={player.id} className="font-semibold">
									{player.name}: {player.score}
								</p>
							))}
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default GenderDuelPage;
