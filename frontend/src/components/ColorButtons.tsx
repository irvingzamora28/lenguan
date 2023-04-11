// ColorButtons.tsx
import React, { useState, useEffect } from "react";
import socket from "./../../socket-server/socket";

const colors = ["Red", "Blue", "Green", "Yellow"];

const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
};

const ColorButtons: React.FC = () => {
    const [currentColor, setCurrentColor] = useState(getRandomColor());
    const [score, setScore] = useState({ player1: 0, player2: 0 });
    const [gameStatus, setGameStatus] = useState<string | null>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentColor(getRandomColor());
        }, 10000);

        socket.on("update-score", (updatedScore) => {
            setScore(updatedScore);
        });

        socket.on("game-over", (message: string) => {
            setGameStatus(message);
        });

        return () => {
            clearInterval(interval);
            socket.off("update-score");
            socket.off("game-over");
        };
    }, []);

    const handleButtonClick = (color: string) => {
        console.log(`${color} button clicked`);
        if (color === currentColor) {
            socket.emit("correct-color-clicked", color);
        }
    };

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-4xl font-bold mb-8">
                {gameStatus ? gameStatus : `Press ${currentColor} button`}
            </h1>
            <div className="flex flex-wrap justify-center">
                {colors.map((color) => (
                    <button
                        key={color}
                        className={`bg-${color.toLowerCase()}-500 w-32 h-32 m-4 rounded-lg focus:outline-none hover:bg-${color.toLowerCase()}-600`}
                        onClick={() => handleButtonClick(color)}
                        disabled={!!gameStatus}
                    ></button>
                ))}
            </div>
            <div className="mt-8">
                <p>Player 1: {score.player1}</p>
                <p>Player 2: {score.player2}</p>
            </div>
        </div>
    );
};

export default ColorButtons;
