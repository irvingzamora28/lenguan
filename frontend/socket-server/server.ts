import express from "express";
import dotenv from "dotenv";
import { Server as HttpServer } from "http";
import { Server as SocketIOServer, Socket as BaseSocket } from "socket.io";
import { GenderDuelWordService } from "../src/services/GenderDuelWordService";
import { Player } from "../src/types/player";

interface GenderDuelSocket extends BaseSocket {
    playerNumber?: number;
    gameRoomId?: string;
    userId?: string; // Associate the socket with a user ID
}

interface GameState {
    players: {
        [userId: string]: Player;
    };
    maxPlayers: number;
    disconnectTimeouts: {
        [userId: string]: NodeJS.Timeout;
    };
    active: boolean;
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
    console.log(`User ID connected: ${socket.userId}`);
    console.log(`User game room ID: ${socket.gameRoomId}`);

    socket.on("join-game-room", async ({ user, gameRoomId, maxPlayers }) => {
        socket.userId = user.id; // Set the user ID on the socket
        socket.gameRoomId = gameRoomId; // Store the game room ID on the socket
        socket.join(gameRoomId);
        console.log(`User ${user.username} joined game room ${gameRoomId}`);

        // Create the game room if it doesn't exist and maxPlayers is not 0
        if (!gameState[gameRoomId] && maxPlayers !== 0) {
            gameState[gameRoomId] = { players: {}, maxPlayers: maxPlayers, disconnectTimeouts: {}, active: true };
        }

        if (gameState[gameRoomId]) {
            const playerNumber = Object.keys(gameState[gameRoomId].players).length + 1;
            gameState[gameRoomId].players[user.id] = {
                id: user.id,
                username: user.username,
                name: user.name,
                score: 0,
            };

            socket.playerNumber = playerNumber;

            // Clear any existing disconnect timeout for this user
            if (gameState[gameRoomId].disconnectTimeouts[user.id]) {
                clearTimeout(gameState[gameRoomId].disconnectTimeouts[user.id]);
                delete gameState[gameRoomId].disconnectTimeouts[user.id];
            }

            // Set the active flag to true when the user joins
            gameState[gameRoomId].active = true;

            io.to(gameRoomId).emit("player-assignment", {
                playerNumber: socket.playerNumber,
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

        const gameRoomId = Object.keys(gameState).find((roomId) =>
            gameState[roomId].players.hasOwnProperty(socket.userId!)
        );
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

    socket.on("correct-gender-clicked", ({ user, gameRoomId, gender }) => {
        console.log(`Correct gender clicked: ${gender}`);
        console.log(`Socket ID: ${socket.id}`);
        console.log(`Game Room ID: ${gameRoomId}`);
        console.log(`User ID: ${user.id}`);
        console.log(`gameState:`, gameState);

        // Validate that the gameRoomId exists in the gameState
        if (!gameState[gameRoomId]) {
            console.error(`Invalid gameRoomId: ${gameRoomId}. Room does not exist.`);
            return; // Exit the handler early if the room doesn't exist
        }

        // Check if socket.userId or socket.gameRoomId are undefined
        if (!socket.userId || !socket.gameRoomId) {
            console.log("User ID or Game Room ID is undefined, restoring from event parameters...");

            // Restore from event parameters
            socket.userId = user.id;
            socket.gameRoomId = gameRoomId;

            // Rejoin the room
            socket.join(gameRoomId);

            console.log(`User ${user.id} rejoined room ${socket.gameRoomId}`);
        }

        if (gameState[gameRoomId]) {
            const player = gameState[gameRoomId].players[user.id];
            if (player && player.score < 10) {
                player.score++;
                gameState[gameRoomId].active = true; // Set active to true on correct gender click
                io.to(gameRoomId).emit("update-score", gameState[gameRoomId].players);
                console.log(`Player ${user.username} scored ${player.score}`);

                if (player.score >= 10) {
                    io.to(gameRoomId).emit("game-over", `Player ${player.username} wins!`);
                    console.log(`Player ${user.username} wins!`);
                    for (const userId in gameState[gameRoomId].players) {
                        gameState[gameRoomId].players[userId].score = 0;
                    }
                } else {
                    emitNewWord(gameRoomId);
                }
                console.log(`Done updating scores`);
            }
        } else {
            console.error(`Game room ${gameRoomId} does not exist or player not found.`);
        }
    });


    socket.on("reconnect", () => {
        console.log(`User reconnected: ${socket.userId}`);
    });


    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);

        for (const gameRoomId in gameState) {
            const gameRoom = gameState[gameRoomId];
            if (gameRoom) {
                gameRoom.active = false; // Mark the room as inactive when the user disconnects

                // Set a timeout to check if the player reconnects
                gameRoom.disconnectTimeouts[socket.userId!] = setTimeout(() => {
                    if (!gameRoom.active) {
                        console.log(`Removing player due to inactivity: ${socket.userId}`);
                        delete gameRoom.players[socket.userId!];
                        io.to(gameRoomId).emit("update-score", gameRoom.players);

                        if (Object.keys(gameRoom.players).length === 0) {
                            delete gameState[gameRoomId];
                            console.log(`Game room ${gameRoomId} has been deleted due to no players.`);
                        }
                    }
                }, 3000000); // 30 seconds timeout to allow reconnection
            }
        }
        console.log(gameState);
    });
});
