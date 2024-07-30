import React, { useEffect, useRef, useState } from "react";
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
import { useIsGuest, useSelectedLanguage } from "../../../redux/hooks";
import LoginForm from "../../Items/Forms/LoginForm";
import useUserGuestLogin from "../../../hooks/useUserGuestLogin";
import ButtonGoBack from "../../Items/Games/ButtonGoBack";
import ButtonCreateGameRoom from "../../Items/Games/ButtonCreateGameRoom";
import JoinGameRoomForm from "../../Items/Games/JoinGameRoomForm";
import { useNavigate, useParams } from "react-router-dom";

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
    const { room_id } = useParams<{ room_id: string }>();
    const [connectionError, setConnectionError] = useState(false);
    const { playerNumber, gameStatus, word, players, appearing, correctGender, incorrectGender, handleGenderClick, resetAnimation, handleStartGame, handleStartSinglePlayerGame } = useGenderDuelSocket(username, selectedLanguage, room_id || null);
    const isGuest = useIsGuest();

    useEffect(() => {
        console.log("This is the room_id:", room_id);

    }, [room_id]);

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
                        <>
                            {room_id ? (
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
                                </>
                            ) : (
                                <div className="flex flex-col items-center space-y-4">
                                    <ButtonCreateGameRoom userId={user.id} isGuest={isGuest} />
                                    <JoinGameRoomForm />
                                    <button
                                        onClick={handleStartSinglePlayerGame}
                                        className="flex items-center shadow-box justify-center h-12 md:h-16 w-80 max-w-sm md:w-full drop-shadow-xl rounded-lg px-8 py-4 overflow-hidden group bg-rose-400 relative hover:bg-gradient-to-r hover:from-rose-400 hover:to-rose-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-rose-400 transition-all ease-out duration-300"
                                    >
                                        <span className="absolute right-0 w-12 h-44 -mt-12 transition-all duration-1000 transform translate-x-16 bg-white opacity-10 rotate-12 group-hover:-translate-x-72 ease"></span>
                                        <span className="relative text-lg md:text-2xl font-bold">
                                            Single Player
                                        </span>
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default GenderDuelPage;
