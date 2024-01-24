import React, { useRef } from "react";
import "../../../assets/scss/components/GenderDuelPage.scss";
import { FaMars, FaVenus, FaNeuter } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GameLoginForm from "../../Items/Forms/GameLoginForm";
import ButtonStart from "../../Items/Games/ButtonStart";
import GenderDuelScoreBoard from "../../Items/Games/GenderDuel/GenderDuelScoreBoard";
import GenderDuelGenderButtons from "../../Items/Games/GenderDuel/GenderDuelGenderButtons";
import useGenderDuelSocket from "../../../hooks/useGenderDuelSocket";
import useUserLogin from "../../../hooks/useUserLogin";
import useUserUsername from "../../../hooks/useUserUsername";
import { useSelectedLanguage } from "../../../redux/hooks";
import LoginForm from "../../Items/Forms/LoginForm";
import useUserGuestLogin from "../../../hooks/useUserGuestLogin";
import ButtonGoBack from "../../Items/Games/ButtonGoBack";

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

const GenderDuelPage: React.FC = () => {
	const { user, username, handleEnterAsGuest } = useUserUsername();
	const { handleLoginAsGuest } = useUserGuestLogin();
	const { errorMessages, loginData, handleChange, handleLogin } = useUserLogin();
	const selectedLanguage = useSelectedLanguage();
	const { connectionError, playerNumber, gameStatus, word, players, appearing, correctGender, incorrectGender, handleGenderClick, resetAnimation, handleStartGame } = useGenderDuelSocket(username, selectedLanguage);

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-t from-blue-400 to-blue-100">
			<ToastContainer />
			{connectionError && (
				<div className="alert">
					Sorry, we are having trouble connecting to the game server. Please try again later. <ButtonGoBack />
				</div>
			)}
			{gameStatus !== "playing" && <h1 className="gender_duel__title text-center">Gender Duel</h1>}
			{playerNumber === 0 ? (
				<>
					<p>Game is full. Please wait for an available slot.</p>
					<ButtonGoBack />
				</>
			) : (
				<>
					{user === null ? (
						<LoginForm onLogin={handleLogin} onChange={handleChange} errorMessages={errorMessages} onLoginAsGuest={handleLoginAsGuest} />
					) : (
						// <GameLoginForm handleLogin={handleLoginWithToast} onChange={handleChange} handleEnterAsGuest={handleEnterAsGuest} />
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
