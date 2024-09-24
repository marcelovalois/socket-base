type ChatMessage = {
  text: string;
  user_id: string;
  pontuandoQuote: boolean;
};

type ChatUser = {
  id: number;
  name: string;
  photo?: string;
};
