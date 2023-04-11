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

server.listen(3001, () => {
  console.log('Socket.IO server is running on port 3001');
});

io.on('connection', (socket: Socket) => {
  console.log(`User connected: ${socket.id}`);

  if (gameState.players.length < 2) {
    gameState.players.push(socket.id);
    socket.emit('player-assignment', gameState.players.indexOf(socket.id) + 1);
  } else {
    socket.emit('player-assignment', 0);
  }

  socket.on('correct-color-clicked', (color: string) => {
    if (gameState.players.length === 2) {
      const playerIndex = gameState.players.indexOf(socket.id);
      if (playerIndex !== -1) {
        gameState.score[`player${playerIndex + 1}` as keyof Score] += 1;
        if (gameState.score[`player${playerIndex + 1}` as keyof Score] >= 10) {
          io.emit('game-over', `Player ${playerIndex + 1} wins!`);
          gameState.score = { player1: 0, player2: 0 };
        } else {
          io.emit('update-score', gameState.score);
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
