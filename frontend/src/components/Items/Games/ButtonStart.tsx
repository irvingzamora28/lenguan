import { FaCopy } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";

interface ButtonStartProps {
	playerNumber: number | null;
	username: string;
	gameStatus: string;
	handleStartGame: () => void;
	roomId?: string;
}

const ButtonStart: React.FC<ButtonStartProps> = ({ playerNumber, username, gameStatus, handleStartGame, roomId }) => {
	const handleCopyRoomId = () => {
        if (roomId) {
            navigator.clipboard.writeText(roomId);
            toast.success("Room ID copied to clipboard! Share it with your friend.", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    };

	return (
		<>
			<ToastContainer />
			{playerNumber !== null && <h2 className="gender_duel__subtitle font-semibold m-4 text-white text-center">{playerNumber === 0 ? "Spectator" : `Player ${username}`}</h2>}
			{(gameStatus === "ready" || gameStatus === "waiting-for-opponent") && (
				<>
					{gameStatus === "ready" && (
						<div className="flex flex-col items-center">
							<button
								className="flex items-center shadow-box justify-center h-16 sm:h-24 w-48 sm:w-64 drop-shadow-xl rounded-lg px-4 sm:px-8 py-2 sm:py-4 overflow-hidden group bg-yellow-400 relative hover:bg-gradient-to-r hover:from-yellow-400 hover:to-yellow-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-yellow-400 transition-all ease-out duration-300"
								onClick={handleStartGame}
							>
								<span className="absolute right-0 w-8 sm:w-12 h-32 sm:h-44 -mt-8 sm:-mt-12 transition-all duration-1000 transform translate-x-12 sm:translate-x-16 bg-white opacity-10 rotate-12 group-hover:-translate-x-48 sm:group-hover:-translate-x-72 ease"></span>
								<span className="relative gender_duel__text-shadow text-2xl sm:text-4xl font-bold">START</span>
							</button>
							<p className="text-xl sm:text-2xl font-semibold m-4 text-white text-center">GAME READY</p>
						</div>
					)}
					{gameStatus === "waiting-for-opponent" && (
						<div className="flex flex-col items-center mt-4 sm:mt-8 px-4">
							<p className="text-xl sm:text-3xl font-extrabold mb-4 text-white animate-bounce text-center">Waiting for the opponent...</p>
							{roomId && (
								<div className="flex flex-col items-center mt-4 bg-blue-800 p-4 rounded-lg shadow-lg w-full sm:w-auto">
									<div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-2">
										<span className="text-xl sm:text-2xl font-bold text-white">Room ID:</span>
										<span className="text-2xl sm:text-3xl font-extrabold text-yellow-300">{roomId}</span>
										<button className="text-white bg-yellow-400 hover:bg-yellow-500 p-2 sm:p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 mt-2 sm:mt-0" onClick={handleCopyRoomId} title="Copy Room ID">
											<FaCopy className="text-xl sm:text-2xl" />
										</button>
									</div>
									<p className="text-base sm:text-lg text-gray-300 mt-2 text-center animate-fade-in">Share this ID with your friend to join the game.</p>
								</div>
							)}
						</div>
					)}
				</>
			)}
		</>
	);
};

export default ButtonStart;
