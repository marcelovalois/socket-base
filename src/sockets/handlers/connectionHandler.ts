import { Server as SocketIOServer, Socket } from "socket.io";

import { RoomManager } from "../roomManager";
import { handleUserConnection, handleUserDisconnection } from "./userHandlers";
import { handleChatMessage } from "./messageHandlers";
import { handleGetRoomUsers } from "./roomHandlers";

const connectedUsers = new RoomManager();

export const handleSocketConnection: (io: SocketIOServer) => void = (io) => {
  io.on("connection", async (socket: Socket) => {
    try {
      console.log(`User trying to connect with socket id ${socket.id}`);

      // Handle user connection
      await handleUserConnection(socket, connectedUsers);

      // Handle socket events
      socket.on("sendChatMessage", (data, ack) => handleChatMessage(socket, data, ack));
      socket.on("getRoomUsers", (data, ack) => handleGetRoomUsers(socket, ack, connectedUsers));

      socket.on("disconnect", () => handleUserDisconnection(socket, connectedUsers));
    } catch (error) {
      console.error(`Error handling socket connection: ${error}`);
    }
  });
};
