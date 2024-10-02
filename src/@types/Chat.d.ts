type ChatMessage = {
  text: string;
  user_id: string;
  pontuandoQuote: boolean;
};

type ChatUser = {
  id: number;
  name: string;
  socketId: string;
  admin: boolean;
  isLocked: boolean;
  photo?: string;
};
