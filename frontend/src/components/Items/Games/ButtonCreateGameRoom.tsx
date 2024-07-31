import React from "react";
import { useNavigate } from "react-router-dom";
import { GameRoomService } from "../../../services/GameRoomService";

interface ButtonCreateGameRoomProps {
    userId: string;
    isGuest: boolean;
    setSinglePlayerRoom: (value: boolean) => void;
    setMaxPlayers: (value: number) => void;
    navigate: ReturnType<typeof useNavigate>;
}

const ButtonCreateGameRoom: React.FC<ButtonCreateGameRoomProps> = ({ userId, isGuest, setSinglePlayerRoom, setMaxPlayers, navigate }) => {

    const handleSinglePlayerGame = async () => {
        try {
            const gameRoom = await GameRoomService.createGameRoom(userId, isGuest, 1);
            console.log('Created single player game room:', gameRoom);
            console.log(`Navigating to game room: /gender-duel/${gameRoom.room_code}`);

            setSinglePlayerRoom(true);
            setMaxPlayers(1); // Set maxPlayers for single player
            navigate(`/gender-duel/${gameRoom.room_code}`);
        } catch (error) {
            console.error('Error creating single player game room:', error);
        }
    };

    const handleMultiPlayerGame = async () => {
        try {
            const gameRoom = await GameRoomService.createGameRoom(userId, isGuest, 2);
            console.log('Created multiplayer game room:', gameRoom);
            console.log(`Navigating to game room: /gender-duel/${gameRoom.room_code}`);

            setSinglePlayerRoom(false);
            setMaxPlayers(2); // Set maxPlayers for multiplayer
            navigate(`/gender-duel/${gameRoom.room_code}`);
        } catch (error) {
            console.error('Error creating multiplayer game room:', error);
        }
    };

    return (
        <div className="flex flex-col space-y-4">
            <button
                onClick={handleSinglePlayerGame}
                className="flex items-center shadow-box justify-center h-12 md:h-16 w-80 max-w-sm md:w-full drop-shadow-xl rounded-lg px-8 py-4 overflow-hidden group bg-rose-400 relative hover:bg-gradient-to-r hover:from-rose-400 hover:to-rose-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-rose-400 transition-all ease-out duration-300"
            >
                <span className="absolute right-0 w-12 h-44 -mt-12 transition-all duration-1000 transform translate-x-16 bg-white opacity-10 rotate-12 group-hover:-translate-x-72 ease"></span>
                <span className="relative text-lg md:text-2xl font-bold">
                    Single Player
                </span>
            </button>
            <button
                onClick={handleMultiPlayerGame}
                className="flex items-center shadow-box justify-center h-12 md:h-16 w-80 max-w-sm md:w-full drop-shadow-xl rounded-lg px-8 py-4 overflow-hidden group bg-blue-400 relative hover:bg-gradient-to-r hover:from-blue-400 hover:to-blue-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-blue-400 transition-all ease-out duration-300"
            >
                <span className="absolute right-0 w-12 h-44 -mt-12 transition-all duration-1000 transform translate-x-16 bg-white opacity-10 rotate-12 group-hover:-translate-x-72 ease"></span>
                <span className="relative text-lg md:text-2xl font-bold">
                    Multi Player
                </span>
            </button>
        </div>
    );
};

export default ButtonCreateGameRoom;
