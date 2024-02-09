export class Execution {
  public id?: number;
  public user_id!: number;
  public activity_id!: number;
  public participation_id!: number;
  public activity_title?: string = "";
  public message?: string = "";
  public message_id?: number;
  public pontuando_quote: boolean = false;

  constructor(props: Omit<Execution, "id">, id?: number) {
    Object.assign(this, props);

    if (id) {
      this.id = id;
    }
  }
}
