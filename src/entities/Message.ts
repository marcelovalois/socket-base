export class Message {
  public id: number = NaN;
  public user_id: number = NaN;
  public text: string = "";
  public pontuando_quote?: boolean = false;

  constructor(props: Omit<Message, "id">, id?: number) {
    Object.assign(this, props);

    if (id) {
      this.id = id;
    }
  }
}
