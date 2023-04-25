//server.ts
import express from 'express';
import {Server as HttpServer} from 'http';
import {Server as SocketIOServer, Socket as BaseSocket} from 'socket.io';

interface GenderDuelSocket extends BaseSocket {
    playerNumber?: number;
}

const app = express();
const server = new HttpServer(app);
const io = new SocketIOServer(server, {
    cors: {
        origin: '*'
    }
});

const MAX_PLAYERS = 2;

interface Score {
    [key : string]: number;
}

interface GameState {
  players: { [key: string]: string };
  score: Score;
}

const gameState: GameState = {
    players: {},
    score: {}
};

let intervalId: NodeJS.Timeout;

const availablePlayerNumbers = Array.from({
    length: MAX_PLAYERS
}, (_, i) => i + 1);

const words = [
    {
        word: "Haus",
        gender: "das",
        translation: "house",
        difficulty_level: 1,
        category: "Housing"
    },
    {
        word: "Apfel",
        gender: "der",
        translation: "apple",
        difficulty_level: 1,
        category: "Food & Drinks"
    },
    {
        word: "Katze",
        gender: "die",
        translation: "cat",
        difficulty_level: 1,
        category: "Animals"
    },
];

const getRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
};

const emitNewWord = () => {
    const newWord = getRandomWord();
    io.emit("new-word", newWord);
    console.log(`New word emitted: ${
        newWord.word
    }`);

    clearInterval(intervalId);
    intervalId = setInterval(() => {
            if (Object.keys(gameState.players).length === MAX_PLAYERS) {
            emitNewWord();
        }
    }, 10000);
};

server.listen(3001, () => {
    console.log('Socket.IO server is running on port 3001');
});

io.on('connection', (socket : GenderDuelSocket) => {
    console.log(`User connected: ${
        socket.id
    }`);
    console.log(`gameState.players.length: ${
        gameState.players.length
    }`);

    socket.on("start-game", () => {
            if (Object.keys(gameState.players).length === MAX_PLAYERS) {
            io.emit("start-game");
            emitNewWord();
        }
    });


    socket.on("register-player", (playerUsername: string) => {
        console.log(`availablePlayerNumbers: ${availablePlayerNumbers}`);

        if (availablePlayerNumbers.length > 0) {
          const playerNumber = availablePlayerNumbers.shift()!;
          gameState.players[socket.id] = playerUsername;
          gameState.score[playerUsername] = 0;
          console.log(`Player ${playerNumber} connected`);
          socket.emit("player-assignment", playerNumber);

          socket.playerNumber = playerNumber;
        } else {
          socket.emit("player-assignment", 0);
        }
      });


    socket.on('correct-gender-clicked', (gender : string) => {
        console.log(`Correct gender clicked ${gender}`);
            console.log(gameState.players);
            console.log(`gameState.players.length: ${Object.keys(gameState.players).length} `);
            console.log(gameState.score);

            if (Object.keys(gameState.players).length === MAX_PLAYERS) {
                const playerNumber = gameState.players[socket.id];
                console.log(`playerNumber: ${playerNumber}`);
                if (playerNumber) {
                    gameState.score[playerNumber]++;

                if (gameState.score[playerNumber] >= 10) {
                    io.emit(
                        'game-over',
                        `Player ${
                            playerNumber + 1
                        } wins!`
                    );
                    for (let i = 1; i <= MAX_PLAYERS; i++) {
                        gameState.score[`player${i}`] = 0;
                    }
                } else {
                    io.emit('update-score', gameState.score);
                    clearInterval(intervalId);

                    intervalId = setInterval(() => {
                        emitNewWord();
                    }, 1000);
                }
            }
        }
    });

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
        const playerNumber = gameState.players[socket.id];
        if (playerNumber) {
          availablePlayerNumbers.push(parseInt(playerNumber.slice(-1)));
          availablePlayerNumbers.sort(); // Keep the array sorted
          delete gameState.players[socket.id];
          delete gameState.score[playerNumber];
        }
      });
});
