import { Socket } from "socket.io";
import { findUserByIdUseCase } from "../useCases/Users/FindUserById"; // Certifique-se de importar corretamente

export const handleUserConnection = async (socket: Socket) => {
  const id = socket.handshake.query.id as string;
  if (!id) {
    socket.disconnect();
    return;
  }

  const parsedId = Number(id);
  const user = await findUserByIdUseCase.execute({ id: parsedId });

  if (user) {
    socket.join(user.id?.toString() || "");
    console.log(`User ${user.id} connected to socket id ${socket.id}`);
    socket.emit("getId", socket.id);
  } else {
    socket.disconnect();
  }

  socket.emit("getId", socket.id);
};
