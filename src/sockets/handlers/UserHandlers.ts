import { findUserByIdUseCase } from "../../useCases/Users/FindUserById"; // Certifique-se de importar corretamente
import { SocketWithUser } from "../../@types/Socket";
import { RoomManager } from "../RoomManager";
import { IExecutionsRepository } from "../../repositories/interfaces/IExecutionsRepository";
import { IActivitiesRepository } from "../../repositories/interfaces/IActivitiesRepository";
import { z } from "zod";

const lockingUserSchema = z.object({
  user_id: z.number(),
});

export class UserHandlers {
  constructor(
    private executionsRepository: IExecutionsRepository,
    private activitiesRepository: IActivitiesRepository,
    private connectedUsers: RoomManager,
  ) {}

  public handleUserConnection = async (socket: SocketWithUser) => {
    // Obtenha o id do usuário do query params
    const user_id = socket.handshake.query.user_id as string;
    const activity_id = socket.handshake.query.activity_id as string;

    // Se não houver id, desconecte o socket
    if (!user_id || !activity_id) {
      socket.disconnect();
      return;
    }

    const user = await findUserByIdUseCase.execute({ id: Number(user_id) });
    const activity = await this.activitiesRepository.findById(Number(activity_id));

    if (user && activity) {
      // Checa se o usuário é o criador da atividade
      const admin = activity.user_id === user.id;

      // Conecta o usuário à sala da atividade
      socket.join(activity_id);

      // Adiciona o usuário à lista de usuários conectados à sala
      this.connectedUsers.joinRoom(activity_id, {
        id: user.id,
        name: user.name,
        socketId: socket.id,
        admin,
        isLocked: true,
      });

      // Adiciona as informações do usuário ao socket, para acesso posterior
      socket.user = { id: user.id, name: user.name };

      // Envia a nova lista de usuários conectados para todos os usuários na sala
      socket.to(activity_id).emit("onGetRoomUsers", this.connectedUsers.getRoomUsers(activity_id));
      // Envia a lista de usuários conectados ao próprio socket
      socket.emit("onGetRoomUsers", this.connectedUsers.getRoomUsers(activity_id));

      // Obtém a última frase lançada na atividade
      const lastPhrase = await this.executionsRepository.getActivityLastPhrase(Number(activity_id));
      // Envia a última frase lançada para o usuário
      if (lastPhrase) {
        socket.emit("onPhrase", lastPhrase);
      }

      console.log(`User ${user.id} connected to socket id ${socket.id} in activity ${activity_id}`);
    } else {
      socket.disconnect();
    }
  };

  public handleUserDisconnection = (socket: SocketWithUser) => {
    const userId = socket.user?.id;
    const activityId = socket.handshake.query.activity_id as string;
    const socketId = socket.id;

    if (userId) {
      // Remove o usuário da lista de usuários conectados à sala
      this.connectedUsers.leaveRoom(activityId, socketId);

      socket.to(activityId).emit("onGetRoomUsers", this.connectedUsers.getRoomUsers(activityId));

      console.log(`User ${userId} disconnected from socket id ${socket.id} in activity ${activityId}`);
    }
  };

  public handleLockingUser = async (
    socket: SocketWithUser,
    data: { user_id: number },
    ack: (arg0: string) => void,
    lock: boolean,
  ) => {
    try {
      const { user_id } = lockingUserSchema.parse(data);
      const activity_id = socket.handshake.query.activity_id as string;

      // Obtém a atividade
      const activity = await this.activitiesRepository.findById(Number(activity_id));

      // Se a atividade não existir, envie uma mensagem de erro
      if (!activity) {
        if (ack) ack(JSON.stringify({ success: false, message: "Activity not found" }));
        return;
      }

      // Checa se o usuário é o criador da atividade
      const admin = activity.user_id === socket.user?.id;

      // Se o usuário não for o criador da atividade, envie uma mensagem de erro
      if (!admin) {
        if (ack) ack(JSON.stringify({ success: false, message: "User not authorized" }));
        return;
      }

      const user = this.connectedUsers.getRoomUsers(activity_id).find((u) => u.id === user_id);
      if (user) {
        if (lock) {
          this.connectedUsers.lockUser(activity_id, user_id);
        } else {
          this.connectedUsers.unlockUser(activity_id, user_id);
        }

        socket.to(activity_id).emit("onGetRoomUsers", this.connectedUsers.getRoomUsers(activity_id));
        socket.emit("onGetRoomUsers", this.connectedUsers.getRoomUsers(activity_id));

        if (ack) ack(JSON.stringify({ success: true, message: "User unlocked" }));
      } else {
        if (ack) ack(JSON.stringify({ success: false, message: "User not found" }));
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        if (ack) ack(JSON.stringify({ success: false, message: "Error: Invalid data", error: error.issues }));
      } else if (error instanceof Error) {
        if (ack) ack(JSON.stringify({ success: false, message: error.message }));
      }
    }
  };
}
