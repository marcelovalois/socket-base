export class Message {
  public text!: string;
  public user_id!: number;
  public id?: number;
  public pontuandoQuote?: boolean;

  constructor(props: Omit<Message, "id">, id?: number) {
    Object.assign(this, props);

    if (id) {
      this.id = id;
    }
  }
}
