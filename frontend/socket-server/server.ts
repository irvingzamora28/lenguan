import express from 'express';
import {Server as HttpServer} from 'http';
import {Server as SocketIOServer, Socket as BaseSocket} from 'socket.io';
import { GenderDuelWordService } from '../src/services/GenderDuelWordService.ts';

interface GenderDuelSocket extends BaseSocket {
    playerNumber?: number;
}

interface Player {
    id: string;
    name: string;
    score: number;
}

interface GameState {
    players: {
        [id : string]: Player
    };
}

const app = express();
const server = new HttpServer(app);
const io = new SocketIOServer(server, {
    cors: {
        origin: '*'
    }
});

const MAX_PLAYERS = 2;
const MAX_WORDS = 20;

const gameState: GameState = {
    players: {}
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
    }, {
        word: "Apfel",
        gender: "der",
        translation: "apple",
        difficulty_level: 1,
        category: "Food & Drinks"
    }, {
        word: "Katze",
        gender: "die",
        translation: "cat",
        difficulty_level: 1,
        category: "Animals"
    },
];

const emitNewWord = async () => {
	const newWord = GenderDuelWordService.getNextWord();
	if (newWord) {
		io.emit("new-word", newWord);
		console.log(`New word emitted: ${newWord.word}`);

		clearInterval(intervalId);
		intervalId = setInterval(() => {
			if (Object.keys(gameState.players).length === MAX_PLAYERS) {
				emitNewWord();
			}
		}, 10000);
	} else {
		console.log("No words available");
	}
};

server.listen(3001, () => {
    console.log('Socket.IO server is running on port 3001');
});

io.on('connection', (socket : GenderDuelSocket) => {
    console.log(`User connected: ${
        socket.id
    }`);

    socket.on("start-game", () => {
        if (Object.keys(gameState.players).length === MAX_PLAYERS) {
            GenderDuelWordService.fetchWords(MAX_WORDS)
            .then(() => {
                console.log('Words fetched successfully')
                io.emit("start-game");
                emitNewWord();
            })
            .catch((err: any) => console.log('Error fetching words:', err));

        }
    });

    socket.on("game-state-request", () => {
        socket.emit("game-state", gameState);
    });

    socket.on("register-player", (playerName : string) => {
        console.log(`availablePlayerNumbers: ${availablePlayerNumbers}`);

        if (availablePlayerNumbers.length > 0) {
            const playerNumber = availablePlayerNumbers.shift()!;
            const player: Player = {
                id: socket.id,
                name: playerName,
                score: 0
            };
            gameState.players[socket.id] = player;
            console.log(`Player ${playerNumber} connected`);
            console.log(`Number of players connected: ${
                Object.keys(gameState.players).length
            }`);
            socket.emit("player-assignment", {
                playerNumber,
                connectedPlayers: Object.keys(gameState.players).length,
                maxPlayers: MAX_PLAYERS
            });

            socket.playerNumber = playerNumber;

            // If the game is full, start the game
            if (Object.keys(gameState.players).length === MAX_PLAYERS) {
                io.emit("game-ready");
                emitNewWord();
            }
        } else {
            socket.emit("player-assignment", {
                playerNumber: 0,
                connectedPlayers: Object.keys(gameState.players).length,
                maxPlayers: MAX_PLAYERS
            });
        }
    });

    socket.on('correct-gender-clicked', (gender : string) => {
        console.log(`Correct gender clicked ${gender}`);
        console.log(gameState.players);
        console.log(`gameState.players.length: ${
            Object.keys(gameState.players).length
        } `);
        console.log(gameState.players);

        if (Object.keys(gameState.players).length === MAX_PLAYERS) {
            const playerId = socket.id;
            const player = gameState.players[playerId];
            console.log(`playerId: ${playerId}`);
            if (player) {
                player.score ++;

                if (player.score >= 10) {
                    io.emit('game-over', `Player ${
                        player.name
                    } wins!`);
                    for (let playerId in gameState.players) {
                        gameState.players[playerId].score = 0;
                    }
                } else {
                    io.emit('update-score', gameState.players);
                    clearInterval(intervalId);

                    intervalId = setInterval(() => {
                        emitNewWord();
                    }, 1000);
                }
            }
        }

    });

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${
            socket.id
        }`);
        const player = gameState.players[socket.id];
        console.log(`player: ${player}`);

        if (player) {
            availablePlayerNumbers.push( socket.playerNumber! );
            availablePlayerNumbers.sort(); // Keep the array sorted
            delete gameState.players[socket.id];
            console.log(`Player ${
                player.name
            } disconnected`);
            console.log(`Number of players connected: ${
                Object.keys(gameState.players).length
            }`);
            console.log(`availablePlayerNumbers: ${availablePlayerNumbers}`);
        }
    });
});
