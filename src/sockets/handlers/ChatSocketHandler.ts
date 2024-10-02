import { Server as SocketIOServer, Socket } from "socket.io";

import { RoomManager } from "../RoomManager";
import { UserHandlers } from "./UserHandlers";
import { MessageHandlers } from "./MessageHandlers";
import { RoomHandlers } from "./RoomHandlers";
import { PrismaExecutionsRepository } from "../../repositories/implementations/PrismaExecutionsRepository";
import { PrismaActivitiesRepository } from "../../repositories/implementations/PrismaActivitiesRepository";

export class ChatSocketHandler {
  private prismaExecutionsRepository;
  private prismaActivitiesRepository;
  private userHandlers;
  private messageHandlers;
  private roomHandlers;
  private connectedUsers;

  constructor(private io: SocketIOServer) {
    this.io = io;

    // Repositories
    this.prismaExecutionsRepository = new PrismaExecutionsRepository();
    this.prismaActivitiesRepository = new PrismaActivitiesRepository();
    this.connectedUsers = new RoomManager();

    this.userHandlers = new UserHandlers(
      this.prismaExecutionsRepository,
      this.prismaActivitiesRepository,
      this.connectedUsers,
    );
    this.messageHandlers = new MessageHandlers(this.prismaExecutionsRepository);
    this.roomHandlers = new RoomHandlers(this.connectedUsers);
  }

  public handleSocketConnection = () => {
    const { io } = this;

    io.on("connection", async (socket: Socket) => {
      try {
        console.log(`User trying to connect with socket id ${socket.id}`);

        // Handle user connection
        await this.userHandlers.handleUserConnection(socket);

        // Handle socket events
        socket.on("sendChatMessage", (data, ack) => this.messageHandlers.handleChatMessage(socket, data, ack));
        socket.on("sendAnswerMessage", (data, ack) => this.messageHandlers.handleAnswerMessage(socket, data, ack));
        socket.on("sendPhrase", (data, ack) => this.messageHandlers.handlePhrase(socket, data, ack));

        socket.on("lockUser", (data, ack) => this.userHandlers.handleLockingUser(socket, data, ack, true));
        socket.on("unlockUser", (data, ack) => this.userHandlers.handleLockingUser(socket, data, ack, false));

        socket.on("getRoomUsers", (_, ack) => this.roomHandlers.handleGetRoomUsers(socket, ack));

        socket.on("disconnect", () => this.userHandlers.handleUserDisconnection(socket));
      } catch (error) {
        console.error(`Error handling socket connection: ${error}`);
      }
    });
  };
}
