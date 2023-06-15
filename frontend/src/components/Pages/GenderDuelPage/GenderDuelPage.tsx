import React, { useState, useEffect, useRef } from "react";
import socket from "../../../../socket-server/socket";
import correctSound from "../../../assets/audio/correct-choice.mp3";
import incorrectSound from "../../../assets/audio/incorrect-choice.mp3";
import "../../../assets/scss/components/GenderDuelPage.scss";
import { FaMars, FaVenus, FaNeuter } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GameLoginForm from "../../Items/Forms/GameLoginForm";
import ButtonStart from "../../Items/Games/ButtonStart";
import { Player } from "../../../types";
import GenderDuelScoreBoard from "../../Items/Games/GenderDuel/GenderDuelScoreBoard";
import GenderDuelGenderButtons from "../../Items/Games/GenderDuel/GenderDuelGenderButtons";
import { useAppDispatch, useUser } from "../../../redux/hooks";
import { loginFailure, loginRequest, loginSuccess } from "../../../redux/authSlice";
import { LoginService } from "../../../services/LoginService";

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

type Players = {
	[players: string]: Player;
};

interface LoginData {
	email: string;
	password: string;
}

const GenderDuelPage: React.FC = () => {
	const dispatch = useAppDispatch();
	const user = useUser();
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
	const [connectionError, setConnectionError] = useState(false);

	const [loginData, setLoginData] = useState<LoginData>({
		email: "",
		password: "",
	});

	const resetAnimation = () => {
		setCorrectGender(null);
		setIncorrectGender(null);
		setAppearing(false);
	};

	useEffect(() => {
		// Check if user is logged in
		if (user !== null) {
			setUsername(user.username ?? "guest");
		}
		return () => {};
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
		socket.on("connect_error", (err) => {
			console.log("Connection Failed", err);
			setConnectionError(true);
		});

		socket.on("connect_timeout", () => {
			console.log("Connection Timeout");
			setConnectionError(true);
		});

		socket.on("connect", () => {
			console.log("Connected");
			setConnectionError(false);
		});

		return () => {
			socket.off("connect_error");
			socket.off("connect_timeout");
			socket.off("connect");
		};
	}, [socket]);

	useEffect(() => {
		socket.on("player-assignment", (assignedData: { playerNumber: number; connectedPlayers: number; maxPlayers: number }) => {
			const { playerNumber, connectedPlayers, maxPlayers } = assignedData;
			setPlayerNumber(playerNumber);
			setMaxPlayers(maxPlayers);
			setConnectedPlayers(connectedPlayers);

			if (playerNumber === 0) {
				setGameStatus("waiting");
			} else if (connectedPlayers < maxPlayers) {
				setGameStatus("waiting-for-opponent");
			} else {
				setGameStatus("ready");
			}
		});

		socket.on("new-word", (newWord: Word) => {
			setWord(newWord);
		});

		socket.on("update-score", (players: Players) => {
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
			}
		} else {
			setIncorrectGender(gender);
			setSoundEffect(incorrectSound);
		}
	};

	const handleStartGame = () => {
		socket.emit("start-game");
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setLoginData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleLogin = async (event: React.FormEvent) => {
		event.preventDefault();
		const usernameValue = usernameInput.current?.value;
		const passwordValue = passwordInput.current?.value;
		if (usernameValue && usernameValue.trim() !== "" && passwordValue && passwordValue.trim() !== "") {
			dispatch(loginRequest());
			try {
				const response = await LoginService.login(loginData);
				const accessToken = response?.data?.token;
				dispatch(loginSuccess({ token: accessToken, user: response.data.user }));
			} catch (error: any) {
				if (error.response && error.response.data && error.response.data.message) {
					dispatch(loginFailure(error.response.data.message));
				} else {
				}
				dispatch(loginFailure("An error occurred. Please try again."));
			}
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
			{connectionError && <div className="alert">Sorry, we are having trouble connecting to the game server. Please try again later.</div>}
			{gameStatus !== "playing" && <h1 className="gender_duel__title text-center">Gender Duel</h1>}
			{playerNumber === 0 ? (
				<p>Game is full. Please wait for an available slot.</p>
			) : (
				<>
					{user === null ? (
						<GameLoginForm handleLogin={handleLogin} onChange={handleChange} handleEnterAsGuest={handleEnterAsGuest} />
					) : (
						<ButtonStart playerNumber={playerNumber} username={user.username ?? ""} gameStatus={gameStatus} handleStartGame={handleStartGame} />
					)}

					{gameStatus === "playing" && word && (
						<GenderDuelGenderButtons
							appearing={appearing}
							gameStatus={gameStatus}
							word={word}
							genders={genders}
							correctGender={correctGender}
							incorrectGender={incorrectGender}
							handleGenderClick={handleGenderClick}
							resetAnimation={resetAnimation}
						/>
					)}
					{gameStatus === "playing" && <GenderDuelScoreBoard players={players} />}
				</>
			)}
		</div>
	);
};

export default GenderDuelPage;
