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

server.listen(3001, () => {
  console.log('Socket.IO server is running on port 3001');
});

io.on('connection', (socket: Socket) => {
  console.log(`User connected: ${socket.id}`);

  // Add your real-time events and logic here

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});
