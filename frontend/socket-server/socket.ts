import io from "socket.io-client";

const socket = io(process.env.REACT_APP_SOCKET_IO_SERVER_URL || "http://localhost:3001");

export default socket;
