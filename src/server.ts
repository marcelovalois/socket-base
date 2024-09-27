import http from "http";
import { Server as SocketIOServer } from "socket.io";
import SocketManager from "./sockets/SocketManager";

import app from "./app";

// Configurando servidor para Socket
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: { origin: "*" },
});

// Configuração do socket
new SocketManager(io);

const PORT = process.env.PORT || 3333;

server.listen(PORT, () => {
  console.log("App listening on port " + PORT);
});

export { io };
