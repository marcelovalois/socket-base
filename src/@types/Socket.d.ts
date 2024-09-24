import { Socket } from "socket.io";

interface SocketWithUser extends Socket {
  user?: {
    id: number;
    name: string;
  };
}
