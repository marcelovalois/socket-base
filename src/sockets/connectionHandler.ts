import { Server as SocketIOServer, Socket } from "socket.io";

import { handleUserConnection } from "./userHandlers";
import { handleMessageToChatServer, handleMessageToServer } from "./messageHandlers";

export const handleSocketConnection: (io: SocketIOServer) => void = (io) => {
  io.on("connection", async (socket: Socket) => {
    try {
      console.log(`User connected to socket id ${socket.id}`);

      // Handle user connection
      await handleUserConnection(socket);

      // Handle socket events
      socket.on("sendMessageToServer", async (data, ack) => {
        handleMessageToServer(socket, data, ack);
      });

      socket.on("sendMessageToChatServer", handleMessageToChatServer);

      socket.on("disconnect", () => {
        console.log(`User disconnected from socket id ${socket.id}`);
      });
    } catch (error) {
      console.error(`Error handling socket connection: ${error}`);
    }
  });
};
