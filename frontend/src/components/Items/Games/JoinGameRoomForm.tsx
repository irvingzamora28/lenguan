import React, { useState } from 'react';
import { GameRoomService } from '../../../services/GameRoomService';
import { useNavigate } from 'react-router-dom';

const JoinGameRoomForm = () => {
  const [roomCode, setRoomCode] = useState('');
  const [isJoining, setIsJoining] = useState(false);
  const navigate = useNavigate();

  const handleJoinGameRoomForm = async () => {
    setIsJoining(true);
    try {
      const gameRoom = await GameRoomService.joinGameRoom(roomCode, 'currentUserId'); // Replace with actual user ID
      navigate(`/game-rooms/${gameRoom._id}`);
    } catch (error) {
      console.error('Error joining game room:', error);
      setIsJoining(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md mt-4 w-80 max-w-sm md:w-full">
      <h2 className="text-xl font-bold mb-4">Join a Game Room</h2>
      <input
        type="text"
        value={roomCode}
        onChange={(e) => setRoomCode(e.target.value)}
        placeholder="Enter Room Code"
        className="mb-4 p-2 border h-12 md:h-16 w-4/5 text-lg md:text-2xl border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleJoinGameRoomForm}
        disabled={isJoining}
        className="flex items-center shadow-box justify-center h-12 md:h-16 w-4/5 drop-shadow-xl rounded-lg px-8 py-4 overflow-hidden group bg-blue-400 relative hover:bg-gradient-to-r hover:from-blue-400 hover:to-blue-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-blue-400 transition-all ease-out duration-300"
      >
        <span className="absolute right-0 w-12 h-44 -mt-12 transition-all duration-1000 transform translate-x-16 bg-white opacity-10 rotate-12 group-hover:-translate-x-72 ease"></span>
        <span className="relative text-lg md:text-2xl font-bold">
          {isJoining ? 'Joining Room...' : 'Join Game Room'}
        </span>
      </button>
    </div>
  );
};

export default JoinGameRoomForm;
