import express from "express";
import dotenv from "dotenv";
import { Server as HttpServer } from "http";
import { Server as SocketIOServer, Socket as BaseSocket } from "socket.io";
import { GenderDuelWordService } from "../src/services/GenderDuelWordService";
import { Player } from "../src/types/player";
import { Language } from "../src/types/language";

interface GenderDuelSocket extends BaseSocket {
    playerNumber?: number;
    gameRoomId?: string;
    userId?: string; // Associate the socket with a user ID
}

interface GameState {
    players: { [userId: string]: Player };
    maxPlayers: number;
    disconnectTimeouts: { [userId: string]: NodeJS.Timeout };
    active: boolean;
}

const app = express();
const server = new HttpServer(app);
dotenv.config();

const allowedOrigins = process.env.SOCKETIO_ALLOWED_ORIGINS?.split(",") || ["http://localhost:3000"];
const io = new SocketIOServer(server, {
    cors: { origin: allowedOrigins, methods: ["GET", "POST"], credentials: true },
});

const MAX_WORDS = 20;
const gameState: { [gameRoomId: string]: GameState } = {};
let intervalId: NodeJS.Timeout;

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

const handleJoinGameRoom = (socket: GenderDuelSocket, user: Player, gameRoomId: string, maxPlayers: number) => {
    socket.userId = user.id;
    socket.gameRoomId = gameRoomId;
    socket.join(gameRoomId);
    console.log(`User ${user.username} joined game room ${gameRoomId}`);

    if (!gameState[gameRoomId] && maxPlayers !== 0) {
        gameState[gameRoomId] = { players: {}, maxPlayers, disconnectTimeouts: {}, active: true };
    }

    if (gameState[gameRoomId]) {
        const playerNumber = Object.keys(gameState[gameRoomId].players).length + 1;
        gameState[gameRoomId].players[user.id] = { ...user, score: 0 };
        socket.playerNumber = playerNumber;

        if (gameState[gameRoomId].disconnectTimeouts[user.id]) {
            clearTimeout(gameState[gameRoomId].disconnectTimeouts[user.id]);
            delete gameState[gameRoomId].disconnectTimeouts[user.id];
        }

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
        io.to(gameRoomId).emit("room-does-not-exist");
    }

    console.log(gameState);
};

const handleStartGame = (socket: GenderDuelSocket, selectedLanguage: Language) => {
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
};

const handleCorrectGenderClick = (socket: GenderDuelSocket, user: Player, gameRoomId: string, gender: string) => {
    console.log(`Correct gender clicked: ${gender}`);
    console.log(`Socket ID: ${socket.id}`);
    console.log(`Game Room ID: ${gameRoomId}`);
    console.log(`User ID: ${user.id}`);
    console.log(`gameState:`, gameState);

    if (!gameState[gameRoomId]) {
        console.error(`Invalid gameRoomId: ${gameRoomId}. Room does not exist.`);
        return;
    }

    // Check if socket.userId or socket.gameRoomId are undefined
    if (!socket.userId || !socket.gameRoomId) {
        console.log("User ID or Game Room ID is undefined, restoring from event parameters...");

        socket.userId = user.id;
        socket.gameRoomId = gameRoomId;

        // Rejoin the room
        socket.join(gameRoomId);

        console.log(`User ${user.id} rejoined room ${socket.gameRoomId}`);
    }

    const gameRoom = gameState[gameRoomId];

    if (gameRoom) {
        const player = gameRoom.players[user.id];
        if (player && player.score < 10) {
            player.score++;
            gameRoom.active = true;
            io.to(gameRoomId).emit("update-score", gameRoom.players);
            console.log(`Player ${user.username} scored ${player.score}`);

            if (player.score >= 10) {
                if (Object.keys(gameRoom.players).length > 1) {
                    io.to(gameRoomId).emit("game-over", `Player ${player.username} wins!`);
                    console.log(`Player ${user.username} wins!`);
                } else {
                    io.to(gameRoomId).emit("game-over", "Congratulations! You've completed the game.");
                    console.log(`Single-player game completed by ${user.username}`);
                }

                for (const userId in gameRoom.players) {
                    gameRoom.players[userId].score = 0;
                }
            } else {
                emitNewWord(gameRoomId);
            }
            console.log(`Done updating scores`);
        }
    } else {
        console.error(`Game room ${gameRoomId} does not exist or player not found.`);
    }
};

const handleDisconnect = (socket: GenderDuelSocket) => {
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
            }, 30000); // 30 seconds timeout to allow reconnection
        }
    }
    console.log(gameState);
};

const handleCancelGame = (socket: GenderDuelSocket, gameRoomId: string) => {
    if (gameState[gameRoomId]) {
        // Remove the game state for the canceled game
        delete gameState[gameRoomId];
        // Notify other players in the room (if any) that the game has been canceled
        io.to(gameRoomId).emit("game-canceled");
    }
    socket.leave(gameRoomId); // Remove the socket from the room
    console.log(`Game ${gameRoomId} has been canceled`);
};

server.listen(3001, () => {
    console.log("Socket.IO server is running on port 3001");
});

io.on("connection", (socket: GenderDuelSocket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("join-game-room", async ({ user, gameRoomId, maxPlayers }) => handleJoinGameRoom(socket, user, gameRoomId, maxPlayers));

    socket.on("start-game", async ({ selectedLanguage }) => handleStartGame(socket, selectedLanguage));

    socket.on("correct-gender-clicked", async ({ user, gameRoomId, gender }) => handleCorrectGenderClick(socket, user, gameRoomId, gender));

    socket.on("cancel-game", async (gameRoomId: string) => handleCancelGame(socket, gameRoomId));

    socket.on("disconnect", () => handleDisconnect(socket));
});
