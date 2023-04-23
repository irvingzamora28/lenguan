// server.ts
import express from 'express';
import { Server as HttpServer } from 'http';
import { Server as SocketIOServer, Socket as BaseSocket } from 'socket.io';

interface GenderDuelSocket extends BaseSocket {
  playerNumber?: number;
}
const app = express();
const server = new HttpServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: '*',
  },
});

interface Score {
  player1: number;
  player2: number;
}

interface GameState {
  players: string[];
  score: Score;
}

const gameState: GameState = {
  players: [],
  score: { player1: 0, player2: 0 },
};

let intervalId: NodeJS.Timeout;

const availablePlayerNumbers = [1, 2];

const words = [
	{
		word: "Haus",
		gender: "das",
		translation: "house",
		difficulty_level: 1,
		category: "Housing",
	},
	{
		word: "Apfel",
		gender: "der",
		translation: "apple",
		difficulty_level: 1,
		category: "Food & Drinks",
	},
	{
		word: "Katze",
		gender: "die",
		translation: "cat",
		difficulty_level: 1,
		category: "Animals",
	},
	{
		word: "Auto",
		gender: "das",
		translation: "car",
		difficulty_level: 1,
		category: "Transportation",
	},
	{
		word: "Baum",
		gender: "der",
		translation: "tree",
		difficulty_level: 1,
		category: "Nature",
	},
	{
		word: "Maus",
		gender: "die",
		translation: "mouse",
		difficulty_level: 2,
		category: "Animals",
	},
	{
		word: "Wasser",
		gender: "das",
		translation: "water",
		difficulty_level: 1,
		category: "Food & Drinks",
	},
	{
		word: "Kuh",
		gender: "die",
		translation: "cow",
		difficulty_level: 2,
		category: "Animals",
	},
	{
		word: "Stuhl",
		gender: "der",
		translation: "chair",
		difficulty_level: 1,
		category: "Furniture",
	},
	{
		word: "Flugzeug",
		gender: "das",
		translation: "airplane",
		difficulty_level: 2,
		category: "Transportation",
	},
	{
		word: "Hund",
		gender: "der",
		translation: "dog",
		difficulty_level: 1,
		category: "Animals",
	},
	{
		word: "Tisch",
		gender: "der",
		translation: "table",
		difficulty_level: 1,
		category: "Furniture",
	},
	{
		word: "Schaf",
		gender: "das",
		translation: "sheep",
		difficulty_level: 2,
		category: "Animals",
	},
	{
		word: "Buch",
		gender: "das",
		translation: "book",
		difficulty_level: 1,
		category: "Education",
	},
	{
		word: "Fahrrad",
		gender: "das",
		translation: "bicycle",
		difficulty_level: 2,
		category: "Transportation",
	},
	{
		word: "Fenster",
		gender: "das",
		translation: "window",
		difficulty_level: 1,
		category: "Housing",
	},
	{
		word: "Vogel",
		gender: "der",
		translation: "bird",
		difficulty_level: 1,
		category: "Animals",
	},
	{
		word: "Kleid",
        gender: "das",
		difficulty_level: 2,
		translation: "dress",
		category: "Fashion",
	},
	{
		word: "Eis",
		gender: "das",
		translation: "ice cream",
		difficulty_level: 2,
		category: "Food & Drinks",
	},
	{
		word: "Spinne",
		gender: "die",
		translation: "spider",
		difficulty_level: 3,
		category: "Animals",
	},
];

const getRandomWord = () => {
	const randomIndex = Math.floor(Math.random() * words.length);
	return words[randomIndex];
};

const emitNewWord = () => {
    const newWord = getRandomWord();
    io.emit("new-word", newWord);
    console.log(`New word emitted: ${newWord.word}`);

    // Clear the existing 10-second interval
    clearInterval(intervalId);

    // Reset the 10-second interval
    intervalId = setInterval(() => {
      if (gameState.players.length === 2) {
        emitNewWord();
      }
    }, 10000);
  };

server.listen(3001, () => {
  console.log('Socket.IO server is running on port 3001');
});

io.on('connection', (socket: GenderDuelSocket) => {
    console.log(`User connected: ${socket.id}`);
    console.log(`gameState.players.length: ${gameState.players.length}`);

    socket.on("start-game", () => {
        if (gameState.players.length === 2) {
          io.emit("start-game");
          emitNewWord();
        }
      });

    if (availablePlayerNumbers.length > 0) {
        const playerNumber = availablePlayerNumbers.shift()!;
        gameState.players.push(socket.id);
        console.log(`Player ${playerNumber} connected`);
        socket.emit("player-assignment", playerNumber);

        // Add player number to the socket object
        socket.playerNumber = playerNumber;
      } else {
        socket.emit("player-assignment", 0);
      }

  socket.on('correct-gender-clicked', (gender: string) => {
    console.log(`Correct gender clicked ${gender}`);

    if (gameState.players.length === 2) {
      const playerIndex = gameState.players.indexOf(socket.id);
      if (playerIndex !== -1) {
        gameState.score[`player${playerIndex + 1}` as keyof Score] += 1;
        if (gameState.score[`player${playerIndex + 1}` as keyof Score] >= 10) {
          io.emit('game-over', `Player ${playerIndex + 1} wins!`);
          gameState.score = { player1: 0, player2: 0 };
        } else {
          io.emit('update-score', gameState.score);
          clearInterval(intervalId);

          // Set the 1-second interval to emit a new word
          intervalId = setInterval(() => {
            emitNewWord();
          }, 1000);
        }
      }
    }
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
    const playerIndex = gameState.players.indexOf(socket.id);
    if (playerIndex !== -1) {
      gameState.players.splice(playerIndex, 1);
      // Reclaim the player number when a player disconnects
      if (socket.playerNumber) {
        availablePlayerNumbers.push(socket.playerNumber);
        availablePlayerNumbers.sort(); // Keep the array sorted
      }
    }
  });
});
