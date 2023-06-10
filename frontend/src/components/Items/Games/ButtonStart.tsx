import React from 'react';

interface ButtonStartProps {
  playerNumber: number | null;
  username: string;
  gameStatus: string;
  handleStartGame: () => void;
}

const ButtonStart: React.FC<ButtonStartProps> = ({ playerNumber, username, gameStatus, handleStartGame }) => {
  return (
    <>
      {playerNumber !== null && (
        <h2 className="gender_duel__subtitle font-semibold m-4 text-white">
          {playerNumber === 0 ? 'Spectator' : `Player ${username}`}
        </h2>
      )}
      {gameStatus === 'ready' && (
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
      {gameStatus === 'waiting-for-opponent' && (
        <p className="text-2xl font-semibold m-4 text-white">Waiting for the opponent...</p>
      )}
    </>
  );
};

export default ButtonStart;
