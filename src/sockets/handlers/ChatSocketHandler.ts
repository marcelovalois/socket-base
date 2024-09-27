import { Server as SocketIOServer, Socket } from "socket.io";

import { RoomManager } from "../RoomManager";
import { handleUserConnection, handleUserDisconnection } from "./userHandlers";
import { MessageHandlers } from "./MessageHandlers";
import { RoomHandlers } from "./roomHandlers";

export class ChatSocketHandler {
  private messageHandlers;
  private roomHandlers;
  private connectedUsers: RoomManager;

  constructor(private io: SocketIOServer) {
    this.io = io;
    this.messageHandlers = new MessageHandlers();
    this.roomHandlers = new RoomHandlers();
    this.connectedUsers = new RoomManager();
  }

  public handleSocketConnection = () => {
    const { io, connectedUsers } = this;

    io.on("connection", async (socket: Socket) => {
      try {
        console.log(`User trying to connect with socket id ${socket.id}`);

        // Handle user connection
        await handleUserConnection(socket, connectedUsers);

        // Handle socket events
        socket.on("sendChatMessage", (data, ack) => this.messageHandlers.handleChatMessage(socket, data, ack));
        socket.on("sendAnswerMessage", (data, ack) => this.messageHandlers.handleAnswerMessage(socket, data, ack));

        socket.on("getRoomUsers", (_, ack) => this.roomHandlers.handleGetRoomUsers(socket, ack, connectedUsers));

        socket.on("disconnect", () => handleUserDisconnection(socket, connectedUsers));
      } catch (error) {
        console.error(`Error handling socket connection: ${error}`);
      }
    });
  };
}
