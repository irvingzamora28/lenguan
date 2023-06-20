import React, { useState, useEffect, useRef } from "react";
import "../../../assets/scss/components/GenderDuelPage.scss";
import { FaMars, FaVenus, FaNeuter } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GameLoginForm from "../../Items/Forms/GameLoginForm";
import ButtonStart from "../../Items/Games/ButtonStart";
import GenderDuelScoreBoard from "../../Items/Games/GenderDuel/GenderDuelScoreBoard";
import GenderDuelGenderButtons from "../../Items/Games/GenderDuel/GenderDuelGenderButtons";
import { useAppDispatch, useUser } from "../../../redux/hooks";
import { loginFailure, loginRequest, loginSuccess } from "../../../redux/authSlice";
import { LoginService } from "../../../services/LoginService";
import useGenderDuelSocket from "../../../hooks/useGenderDuelSocket";

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

interface LoginData {
	email: string;
	password: string;
}

const GenderDuelPage: React.FC = () => {
	const dispatch = useAppDispatch();
	const user = useUser();
	const [username, setUsername] = useState<string | null>(null);
	const usernameInput = useRef<HTMLInputElement>(null);
	const passwordInput = useRef<HTMLInputElement>(null);
	const { connectionError, playerNumber, gameStatus, word, players, appearing, correctGender, incorrectGender, handleGenderClick, resetAnimation, handleStartGame } = useGenderDuelSocket(username);

	const [loginData, setLoginData] = useState<LoginData>({
		email: "",
		password: "",
	});

	useEffect(() => {
		// Check if user is logged in
		if (user !== null) {
			setUsername(user.username ?? "guest");
		}
		return () => {};
	}, []);

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
