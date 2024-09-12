import { Socket } from "socket.io";

export const handleMessageToServer = (socket: Socket, data: PontuandoMessage, ack: (arg0: string) => void) => {
  console.log("Received message from client: ", data);

  ack("Message received by server");
  // socket.broadcast.emit("sendMessageToClient", data);
};

export const handleMessageToChatServer = (socket: Socket, data: PontuandoMessage) => {
  socket.broadcast.emit("sendMessageToChatClient", data);
};
