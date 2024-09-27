import { z } from "zod";
import { SocketWithUser } from "../../@types/Socket";
import { Message } from "../../entities/Message";

const chatMessageSchema = z.object({
  text: z.string(),
});

export class MessageHandlers {
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
