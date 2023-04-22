// server.ts
import express from 'express';
import { Server as HttpServer } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';

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

io.on('connection', (socket: Socket) => {
    console.log(`User connected: ${socket.id}`);
    console.log(`gameState.players.length: ${gameState.players.length}`);

    socket.on("start-game", () => {
        if (gameState.players.length === 2) {
            io.emit("both-players-connected");
            emitNewWord();
        }
    });

  if (gameState.players.length < 2) {
    gameState.players.push(socket.id);
    console.log(`Player ${gameState.players.indexOf(socket.id) + 1} connected`);
    socket.emit('player-assignment', gameState.players.indexOf(socket.id) + 1);
  } else {
    socket.emit('player-assignment', 0);
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
    }
  });
});
