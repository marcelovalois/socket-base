import { z } from "zod";
import { SocketWithUser } from "../../@types/Socket";
import { Message } from "../../entities/Message";
import { Phrase } from "../../entities/Phrase";
import { IExecutionsRepository } from "../../repositories/interfaces/IExecutionsRepository";
import { RoomManager } from "../RoomManager";

const chatMessageSchema = z.object({
  text: z.string(),
});

export class MessageHandlers {
  constructor(
    private executionsRepository: IExecutionsRepository,
    private connectedUsers: RoomManager,
  ) {}

  public handleChatMessage = async (socket: SocketWithUser, data: object, ack: (arg0: string) => void) => {
    try {
      const { text } = chatMessageSchema.parse(data);

      // Obtém o id do usuário do socket e a sala que ele está conectado
      const user_id = socket.user?.id || NaN;
      const user_name = socket.user?.name || "Unknown";
      const activity_id = socket.handshake.query.activity_id as string;

      // Cria a mensagem
      const message = new Message({ user_id, text });

      // Envia a mensagem para todos os usuários conectados
      socket.to(activity_id).emit("onChatMessage", { ...message, user_name });

      // Envia uma resposta de sucesso
      if (ack) ack(JSON.stringify({ success: true, message: "Message broadcasted by server" }));
    } catch (error) {
      if (error instanceof z.ZodError) {
        if (ack) ack(JSON.stringify({ success: false, message: "Error: Invalid data", error: error.issues }));
      } else if (error instanceof Error) {
        if (ack) ack(JSON.stringify({ success: false, message: error.message }));
      }
    }
  };

  public handleAnswerMessage = async (socket: SocketWithUser, data: object, ack: (arg0: string) => void) => {
    try {
      const { text } = chatMessageSchema.parse(data);

      // Obtém o id do usuário do socket e a sala que ele está conectado
      const user_id = socket.user?.id || NaN;
      const user_name = socket.user?.name || "Unknown";
      const activity_id = socket.handshake.query.activity_id as string;

      // Cria a mensagem
      const message = new Message({ user_id, text, pontuando_quote: true });

      // Envia a mensagem para todos os usuários conectados
      socket.to(activity_id).emit("onAnswerMessage", { ...message, user_name, incoming: true });
      // Envia a mensagem para o próprio usuário
      socket.emit("onAnswerMessage", { ...message, user_name, incoming: false });

      // BLOQUEIA O ALUNO PARA NÃO RESPONDER MAIS

      // Obtém o usuário que enviou a mensagem
      const user = this.connectedUsers.getRoomUsers(activity_id).find((u) => u.id === user_id);
      if (user) {
        this.connectedUsers.lockUser(activity_id, user_id);
      }

      // Envia a nova lista de usuários conectados para todos os usuários na sala
      socket.to(activity_id).emit("onGetRoomUsers", this.connectedUsers.getRoomUsers(activity_id));
      // Envia a lista de usuários conectados ao próprio socket
      socket.emit("onGetRoomUsers", this.connectedUsers.getRoomUsers(activity_id));

      // Envia uma resposta de sucesso
      if (ack) ack(JSON.stringify({ success: true, message: "Message broadcasted by server" }));
    } catch (error) {
      if (error instanceof z.ZodError) {
        if (ack) ack(JSON.stringify({ success: false, message: "Error: Invalid data", error: error.issues }));
      } else if (error instanceof Error) {
        if (ack) ack(JSON.stringify({ success: false, message: error.message }));
      }
    }
  };

  public handlePhrase = async (socket: SocketWithUser, data: object, ack: (arg0: string) => void) => {
    try {
      const { text } = chatMessageSchema.parse(data);

      // Obtém o id do usuário do socket e a sala que ele está conectado
      const activity_id = socket.handshake.query.activity_id as string;

      // Cria a mensagem
      const phrase = new Phrase({ text, activity_id: Number(activity_id) });

      // Salva a frase no banco de dados
      await this.executionsRepository.savePhrase(phrase);

      // Envia a mensagem para todos os usuários conectados
      socket.to(activity_id).emit("onPhrase", { ...phrase });
      // Envia a mensagem para o próprio usuário
      socket.emit("onPhrase", { ...phrase });

      // Envia uma resposta de sucesso
      if (ack) ack(JSON.stringify({ success: true, message: "Message broadcasted by server" }));
    } catch (error) {
      if (error instanceof z.ZodError) {
        if (ack) ack(JSON.stringify({ success: false, message: "Error: Invalid data", error: error.issues }));
      } else if (error instanceof Error) {
        if (ack) ack(JSON.stringify({ success: false, message: error.message }));
      }
    }
  };
}
