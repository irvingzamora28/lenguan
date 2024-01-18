import io from "socket.io-client";

const socketServerUrl = import.meta.env.VITE_SOCKET_IO_SERVER_URL || "http://localhost:3001";
const socket = io(socketServerUrl);

export default socket;
