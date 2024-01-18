export class Execution {
  public id?: number;
  public user_id!: number;
  public message_id!: number;
  public activity_id!: number;

  constructor(props: Omit<Execution, "id">, id?: number) {
    Object.assign(this, props);

    if (id) {
      this.id = id;
    }
  }
}
