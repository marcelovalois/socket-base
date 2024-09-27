import { Server as SocketIOServer } from "socket.io";
import { ChatSocketHandler } from "./handlers/ChatSocketHandler";

class SocketManager {
  private chatSocketHandler: ChatSocketHandler;

  constructor(io: SocketIOServer) {
    this.chatSocketHandler = new ChatSocketHandler(io);
    this.initialize();
  }

  private initialize(): void {
    this.chatSocketHandler.handleSocketConnection();
  }
}

export default SocketManager;
