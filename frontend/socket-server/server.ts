import express from "express";
import dotenv from "dotenv";
import { Server as HttpServer } from "http";
import { Server as SocketIOServer, Socket as BaseSocket } from "socket.io";
import { GenderDuelWordService } from "../src/services/GenderDuelWordService.ts";
import { Language } from "../src/types/language.ts";

interface GenderDuelSocket extends BaseSocket {
	playerNumber?: number;
}

interface Player {
	id: string;
	username: string;
	score: number;
}

interface GameState {
	players: {
		[id: string]: Player;
	};
}

interface StartGamePayload {
	selectedLanguage: Language;
}

const app = express();
const server = new HttpServer(app);
dotenv.config();

const allowedOrigins = process.env.SOCKETIO_ALLOWED_ORIGINS?.split(",") || ["http://localhost:3000"];

const io = new SocketIOServer(server, {
	cors: {
		origin: allowedOrigins,
		methods: ["GET", "POST"],
		credentials: true,
	},
});

const MAX_PLAYERS = 2;
const MAX_WORDS = 20;

// const gameState: GameState = {
// 	players: {},
// };

let intervalId: NodeJS.Timeout;

const availablePlayerNumbers = Array.from(
	{
		length: MAX_PLAYERS,
	},
	(_, i) => i + 1
);

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

const gameState: { [gameRoomId: string]: GameState } = {};
const emitNewWord = async (gameRoomId: string) => {
    const newWord = GenderDuelWordService.getNextWord();
    if (newWord) {
        io.to(gameRoomId).emit("new-word", newWord);
        console.log(`New word emitted: ${newWord.word} in room ${gameRoomId}`);
        clearInterval(intervalId);
		intervalId = setInterval(() => {
			if (Object.keys(gameState.players).length === MAX_PLAYERS) {
				emitNewWord(gameRoomId);
			}
		}, 10000);
    } else {
        console.log("No words available");
    }
};

server.listen(3001, () => {
	console.log("Socket.IO server is running on port 3001");
});

io.on("connection", (socket: GenderDuelSocket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("start-single-player-game", async ({ selectedLanguage }) => {
        GenderDuelWordService.fetchWords(MAX_WORDS, selectedLanguage._id)
            .then(() => {
                console.log("Words fetched successfully");
                io.to(socket.id).emit("start-game");
                emitNewWord(socket.id); // Use socket ID as room ID for single player
            })
            .catch((err: any) => console.log("Error fetching words:", err));
    });

    socket.on("join-game-room", async ({ username, gameRoomId }) => {
        socket.join(gameRoomId);

        if (!gameState[gameRoomId]) {
            gameState[gameRoomId] = { players: {} };
        }

        const playerNumber = Object.keys(gameState[gameRoomId].players).length + 1;
        gameState[gameRoomId].players[socket.id] = {
            id: socket.id,
            username: username,
            score: 0,
        };

        io.to(gameRoomId).emit("player-assignment", {
            playerNumber,
            connectedPlayers: Object.keys(gameState[gameRoomId].players).length,
            maxPlayers: MAX_PLAYERS,
        });

        if (Object.keys(gameState[gameRoomId].players).length === MAX_PLAYERS) {
            io.to(gameRoomId).emit("game-ready");
            emitNewWord(gameRoomId);
        }
        console.log(gameState);
        // Print all players in the room
        Object.values(gameState[gameRoomId].players).forEach((player) => {
            console.log(`${player.username} (${player.id})`);
        });
    });

    socket.on("start-game", (data: StartGamePayload) => {
        const selectedLanguage = data.selectedLanguage;
        const gameRoomId = Object.keys(socket.rooms).find((room) => room !== socket.id);

        if (gameRoomId && Object.keys(gameState[gameRoomId].players).length === MAX_PLAYERS) {
            GenderDuelWordService.fetchWords(MAX_WORDS, selectedLanguage._id)
                .then(() => {
                    console.log("Words fetched successfully");
                    io.to(gameRoomId).emit("start-game");
                    emitNewWord(gameRoomId);
                })
                .catch((err: any) => console.log("Error fetching words:", err));
        }
    });

    socket.on("correct-gender-clicked", (gender: string) => {
        const gameRoomId = Object.keys(socket.rooms).find((room) => room !== socket.id);
        if (gameRoomId) {
            const player = gameState[gameRoomId].players[socket.id];
            if (player && player.score < 10) {
                player.score++;
                io.to(gameRoomId).emit("update-score", gameState[gameRoomId].players);

                if (player.score >= 10) {
                    io.to(gameRoomId).emit("game-over", `Player ${player.username} wins!`);
                    for (const playerId in gameState[gameRoomId].players) {
                        gameState[gameRoomId].players[playerId].score = 0;
                    }
                } else {
                    emitNewWord(gameRoomId);
                }
            }
        }
    });

    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
        const gameRoomId = Object.keys(socket.rooms).find((room) => room !== socket.id);
        if (gameRoomId) {
            const player = gameState[gameRoomId].players[socket.id];
            if (player) {
                delete gameState[gameRoomId].players[socket.id];
                io.to(gameRoomId).emit("update-score", gameState[gameRoomId].players);
                if (Object.keys(gameState[gameRoomId].players).length === 0) {
                    delete gameState[gameRoomId];
                }
            }
        }
    });
});
