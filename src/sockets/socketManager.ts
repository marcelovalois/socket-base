import { Server as SocketIOServer, Socket } from "socket.io";
import { findUserByIdUseCase } from "../useCases/Users/FindUserById";

class SocketManager {
  constructor(private io: SocketIOServer) {
    this.handleSocketConnection();
  }

  private handleSocketConnection(): void {
    this.io.on("connection", async (socket: Socket) => {
      try {
        const id = socket.handshake.query.id;
        if (!id) {
          socket.disconnect();
          return;
        }

        const parsedId = Number(id);

        const user = await findUserByIdUseCase.execute(parsedId);
        console.log(user);

        if (user) {
          socket.join(user.id?.toString() || "");
          console.log(`User ${user.id} connected to socket id ${socket.id}`);
        } else {
          socket.disconnect();
        }

        socket.emit("getId", socket.id);

        socket.on("sendMessageToServer", async (data: PontuandoMessage) => {
          socket.broadcast.emit("sendMessageToClient", data);
        });

        socket.on("sendMessageToChatServer", async (data: PontuandoMessage) => {
          socket.broadcast.emit("sendMessageToChatClient", data);
        });

        socket.on("disconnect", () => {
          // let users: UserData[] = myCache.get("users") || [];
          // users = users.filter((user) => user.id !== socket.id);
          // myCache.set("users", users);
          // socket.broadcast.emit("removeContactFromClient", socket.id);
        });
      } catch (error) {
        console.error(`Error handling socket connection: ${error}`);
      }
    });
  }
}

export default SocketManager;
