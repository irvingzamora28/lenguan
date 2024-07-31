import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameRoomService } from '../../../services/GameRoomService';

interface ButtonCreateGameRoomProps {
    userId: number;
    isGuest: boolean;
    maxPlayers: number;
}

const ButtonCreateGameRoom: React.FC<ButtonCreateGameRoomProps> = ({ userId, isGuest, maxPlayers }) => {
    const [isCreating, setIsCreating] = useState(false);
    const navigate = useNavigate();

    const handleButtonCreateGameRoom = async () => {
        setIsCreating(true);
        try {
            const gameRoom = await GameRoomService.createGameRoom(userId.toString(), isGuest, maxPlayers);
            console.log('Created game room:', gameRoom);
            console.log('Created game room id:', gameRoom._id);
            console.log(`Navigating to game room: /gender-duel/${gameRoom.room_code}`);

            navigate(`/gender-duel/${gameRoom.room_code}`);
        } catch (error) {
            console.error('Error creating game room:', error);
            setIsCreating(false);
        }
    };

    return (
        <button
          onClick={handleButtonCreateGameRoom}
          disabled={isCreating}
          className="flex items-center shadow-box justify-center h-12 md:h-16 w-80 max-w-sm md:w-full drop-shadow-xl rounded-lg px-8 py-4 my-8 overflow-hidden group bg-green-400 relative hover:bg-gradient-to-r hover:from-green-400 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300"
        >
          <span className="absolute right-0 w-12 h-44 -mt-12 transition-all duration-1000 transform translate-x-16 bg-white opacity-10 rotate-12 group-hover:-translate-x-96 ease"></span>
          <span className="relative text-lg md:text-2xl font-bold">
            {isCreating ? 'Creating Room...' : 'Create Game Room'}
          </span>
        </button>
      );
};

export default ButtonCreateGameRoom;
