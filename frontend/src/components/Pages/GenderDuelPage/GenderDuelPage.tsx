import React, { useEffect, useState } from "react";
import "../../../assets/scss/components/GenderDuelPage.scss";
import { FaMars, FaVenus, FaNeuter, FaArrowLeft } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ButtonStart from "../../Items/Games/ButtonStart";
import GenderDuelScoreBoard from "../../Items/Games/GenderDuel/GenderDuelScoreBoard";
import GenderDuelGenderButtons from "../../Items/Games/GenderDuel/GenderDuelGenderButtons";
import useGenderDuelSocket from "../../../hooks/useGenderDuelSocket";
import useUserLogin from "../../../hooks/useUserLogin";
import useUserUsername from "../../../hooks/useUserUsername";
import { useIsGuest } from "../../../redux/hooks";
import LoginForm from "../../Items/Forms/LoginForm";
import useUserGuestLogin from "../../../hooks/useUserGuestLogin";
import ButtonGoBack from "../../Items/Games/ButtonGoBack";
import ButtonCreateGameRoom from "../../Items/Games/ButtonCreateGameRoom";
import JoinGameRoomForm from "../../Items/Games/JoinGameRoomForm";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../Layout/Layout";

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
	const { room_id } = useParams<{ room_id: string }>();
	const [connectionError, setConnectionError] = useState(false);
	const [singlePlayerRoom, setSinglePlayerRoom] = useState(false);
	const [maxPlayers, setMaxPlayers] = useState(0); // Initialize maxPlayers to 0
	const navigate = useNavigate();

	const { playerNumber, roomDoesNotExist, gameStatus, word, players, appearing, correctGender, incorrectGender, handleGenderClick, resetAnimation, handleStartGame, handleCancelGame, resetRoomDoesNotExist } = useGenderDuelSocket(
		user,
		user?.learning_language || null,
		room_id || null,
		maxPlayers // Pass maxPlayers
	);
	const isGuest = useIsGuest();

	const handleCancelGameClick = () => {
        resetRoomDoesNotExist();
		handleCancelGame();
		setSinglePlayerRoom(false);
	};

	useEffect(() => {
		console.log("This is the room_id:", room_id);
	}, [room_id]);

	const isNavbarVisible = gameStatus !== "playing";

	return (
		<Layout isVisible={isNavbarVisible}>
			<div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-t from-blue-400 to-blue-100">
				<ToastContainer />
				{connectionError && (
					<div className="alert">
						Sorry, we are having trouble connecting to the game server. Please try again later. <ButtonGoBack />
					</div>
				)}
				{gameStatus !== "playing" && <h1 className="gender_duel__title text-center">Gender Duel</h1>}
				{playerNumber === 0 && !singlePlayerRoom ? (
					<>
						<p>Game is full. Please wait for an available slot.</p>
						<ButtonGoBack />
					</>
				) : (
					<>
						{user === null ? (
							<LoginForm onLogin={handleLogin} onChange={handleChange} errorMessages={errorMessages} onLoginAsGuest={handleLoginAsGuest} />
						) : (
							<>
								{room_id || singlePlayerRoom ? (
									<>
										<ButtonStart playerNumber={playerNumber} username={user.username ?? ""} gameStatus={gameStatus} handleStartGame={handleStartGame} />
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
										<button onClick={handleCancelGameClick} className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 flex items-center justify-center">
											<FaArrowLeft className="mr-2" />
											{roomDoesNotExist ? "Go Back" : "Cancel Game"}
										</button>
									</>
								) : (
									<div className="flex flex-col items-center space-y-4">
										<ButtonCreateGameRoom userId={user.id.toString()} isGuest={isGuest} setSinglePlayerRoom={setSinglePlayerRoom} setMaxPlayers={setMaxPlayers} navigate={navigate} />
										<JoinGameRoomForm />
									</div>
								)}
							</>
						)}
					</>
				)}
				{roomDoesNotExist && (
					<div className="bg-slate-500 text-white text-center py-4 px-6 rounded-lg shadow-lg max-w-md mx-auto mt-8">
						<h2 className="text-2xl font-bold mb-2">Room Not Found</h2>
						<p className="mb-4">Sorry, the room you are trying to join does not exist.</p>
					</div>
				)}
			</div>
		</Layout>
	);
};

export default GenderDuelPage;
