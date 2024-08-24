import express from "express";
import dotenv from "dotenv";
import { Server as HttpServer } from "http";
import { Server as SocketIOServer, Socket as BaseSocket } from "socket.io";
import { GenderDuelWordService } from "../src/services/GenderDuelWordService";
import { Language } from "../src/types/language";
import { Player } from "../src/types/player";

interface GenderDuelSocket extends BaseSocket {
    playerNumber?: number;
}

interface GameState {
    players: {
        [id: string]: Player;
    };
    maxPlayers: number;
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

const MAX_WORDS = 20;

let intervalId: NodeJS.Timeout;

const gameState: { [gameRoomId: string]: GameState } = {};

const emitNewWord = async (gameRoomId: string) => {
    const newWord = GenderDuelWordService.getNextWord();
    if (newWord) {
        io.to(gameRoomId).emit("new-word", newWord);
        console.log(`New word emitted: ${newWord.word} in room ${gameRoomId}`);
        clearInterval(intervalId);
        intervalId = setInterval(() => {
            if (gameState[gameRoomId] && Object.keys(gameState[gameRoomId].players).length === gameState[gameRoomId].maxPlayers) {
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

    socket.on("join-game-room", async ({ user, gameRoomId, maxPlayers }) => {
        socket.join(gameRoomId);
        console.log(`User ${user.username} joined game room ${gameRoomId}`);

        // If the game room does not exist and maxPlayers is 0 (No button single-player or multi-player was clicked), we do nothing.
        if (!gameState[gameRoomId] && maxPlayers === 0) {
            return;
        }

        // If the game room does not exist and maxPlayers is not 0 (Multi-player or single-player button was clicked), we create it.
        if (!gameState[gameRoomId] && maxPlayers !== 0) {
            gameState[gameRoomId] = { players: {}, maxPlayers: maxPlayers };
        }

        if (gameState[gameRoomId]) {
            const playerNumber = Object.keys(gameState[gameRoomId].players).length + 1;
            gameState[gameRoomId].players[socket.id] = {
                id: user.id,
                username: user.username,
                name: user.name,
                score: 0,
            };

            socket.playerNumber = playerNumber;

            io.to(gameRoomId).emit("player-assignment", {
                playerNumber,
                connectedPlayers: Object.keys(gameState[gameRoomId].players).length,
                maxPlayers: gameState[gameRoomId].maxPlayers,
            });

            if (Object.keys(gameState[gameRoomId].players).length === gameState[gameRoomId].maxPlayers) {
                io.to(gameRoomId).emit("game-ready");
                emitNewWord(gameRoomId);
            }
        } else {
            console.error(`Game room ${gameRoomId} does not exist in gameState.`);
        }

        console.log(gameState);
    });

    socket.on("start-game", async ({ selectedLanguage }) => {
        console.log(`Start game in socket.id ${socket.id}`);

        const gameRoomId = Object.keys(gameState).find(roomId => gameState[roomId].players[socket.id]);
        console.log(`Start game in room ${gameRoomId}`);

        if (gameRoomId) {
            GenderDuelWordService.fetchWords(MAX_WORDS, selectedLanguage._id)
                .then(() => {
                    console.log("Words fetched successfully");
                    io.to(gameRoomId).emit("start-game");
                    emitNewWord(gameRoomId);
                })
                .catch((err: any) => console.log("Error fetching words:", err));
        } else {
            console.log(`gameRoomId is undefined for socket.id ${socket.id}.`);
        }
    });

    socket.on("cancel-game", (gameRoomId: string) => {
        if (gameState[gameRoomId]) {
            delete gameState[gameRoomId]; // Remove the game state for the canceled game
            io.to(gameRoomId).emit("game-canceled"); // Notify other players in the room (if any) that the game has been canceled
        }
        socket.leave(gameRoomId); // Remove the socket from the room
        console.log(`Game ${gameRoomId} has been canceled`);
    });


    socket.on("correct-gender-clicked", (gender: string) => {
        // Find the game room this socket is part of
        const gameRoomId = Object.keys(gameState).find(roomId => gameState[roomId].players[socket.id]);
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
        } else {
            console.error(`Game room ${gameRoomId} does not exist or player not found.`);
        }
    });

    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);

        for (const gameRoomId in gameState) {
            if (gameState[gameRoomId].players[socket.id]) {
                delete gameState[gameRoomId].players[socket.id];
                console.log(`gameRoomId: ${gameRoomId}`);
                io.to(gameRoomId).emit("update-score", gameState[gameRoomId].players);

                if (Object.keys(gameState[gameRoomId].players).length === 0) {
                    delete gameState[gameRoomId];
                }
                break; // Exit the loop once the player is found and removed
            }
        }
        console.log(gameState);
    });
});
