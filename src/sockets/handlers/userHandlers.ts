import { findUserByIdUseCase } from "../../useCases/Users/FindUserById"; // Certifique-se de importar corretamente
import { SocketWithUser } from "../../@types/Socket";
import { RoomManager } from "../roomManager";

export const handleUserConnection = async (socket: SocketWithUser, connectedUsers: RoomManager) => {
  // Obtenha o id do usuário do query params
  const user_id = socket.handshake.query.user_id as string;
  const activity_id = socket.handshake.query.activity_id as string;

  // Se não houver id, desconecte o socket
  if (!user_id || !activity_id) {
    socket.disconnect();
    return;
  }

  const user = await findUserByIdUseCase.execute({ id: Number(user_id) });

  if (user) {
    // Conecta o usuário à sala da atividade
    socket.join(activity_id);

    // Adiciona o usuário à lista de usuários conectados à sala
    connectedUsers.joinRoom(activity_id, { id: user.id, name: user.name });

    // Adiciona as informações do usuário ao socket, para acesso posterior
    socket.user = { id: user.id, name: user.name };

    // Envia a nova lista de usuários conectados para todos os usuários na sala
    socket.to(activity_id).emit("onGetRoomUsers", connectedUsers.getRoomUsers(activity_id));
    // Envia a lista de usuários conectados ao próprio socket
    socket.emit("onGetRoomUsers", connectedUsers.getRoomUsers(activity_id));

    console.log(`User ${user.id} connected to socket id ${socket.id} in activity ${activity_id}`);
  } else {
    socket.disconnect();
  }
};

export const handleUserDisconnection = (socket: SocketWithUser, connectedUsers: RoomManager) => {
  const user_id = socket.user?.id;
  const activity_id = socket.handshake.query.activity_id as string;

  if (user_id) {
    // Remove o usuário da lista de usuários conectados à sala
    connectedUsers.leaveRoom(activity_id, user_id);

    socket.to(activity_id).emit("onGetRoomUsers", connectedUsers.getRoomUsers(activity_id));

    console.log(`User ${user_id} disconnected from socket id ${socket.id} in activity ${activity_id}`);
  }
};
