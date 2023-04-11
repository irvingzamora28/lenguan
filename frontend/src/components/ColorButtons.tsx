// ColorButtons.tsx
import React, { useState, useEffect } from 'react';
import socket from './../../socket-server/socket';

const colors = ['Red', 'Blue', 'Green', 'Yellow'];

const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

const ColorButtons: React.FC = () => {
  const [currentColor, setCurrentColor] = useState(getRandomColor());
  const [score, setScore] = useState({ player1: 0, player2: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentColor(getRandomColor());
    }, 10000);

    socket.on('update-score', (updatedScore) => {
      setScore(updatedScore);
    });

    return () => {
      clearInterval(interval);
      socket.off('update-score');
    };
  }, []);

  const handleButtonClick = (color: string) => {
    console.log(`${color} button clicked`)
    if (color === currentColor) {
      socket.emit('correct-color-clicked', color);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8">Press {currentColor} button</h1>
      <div className="flex flex-wrap justify-center">
        <button
          className="bg-red-500 w-32 h-32 m-4 rounded-lg focus:outline-none hover:bg-red-600"
          onClick={() => handleButtonClick('Red')}
        ></button>
        <button
        className="bg-blue-500 w-32 h-32 m-4 rounded-lg focus:outline-none hover:bg-blue-600"
                  onClick={() => handleButtonClick('Blue')}

      ></button>
      <button
        className="bg-green-500 w-32 h-32 m-4 rounded-lg focus:outline-none hover:bg-green-600"
                  onClick={() => handleButtonClick('Green')}

      ></button>
      <button
        className="bg-yellow-500 w-32 h-32 m-4 rounded-lg focus:outline-none hover:bg-yellow-600"
                  onClick={() => handleButtonClick('Yellow')}

      ></button>
        {/* Add the same for other buttons */}
      </div>
      <div className="mt-8">
        <p>Player 1: {score.player1}</p>
        <p>Player 2: {score.player2}</p>
      </div>
    </div>
  );
};

export default ColorButtons;
