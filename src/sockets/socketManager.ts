import { Server as SocketIOServer } from "socket.io";
import { handleSocketConnection } from "./handlers/connectionHandler";

class SocketManager {
  constructor(private io: SocketIOServer) {
    this.initialize();
  }

  private initialize(): void {
    handleSocketConnection(this.io);
  }
}

export default SocketManager;
