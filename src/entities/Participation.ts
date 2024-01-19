export class Participation {
  public id?: number;
  public user_id!: number;
  public activity_id!: number;

  constructor(props: Omit<Participation, "id">, id?: number) {
    Object.assign(this, props);

    if (id) {
      this.id = id;
    }
  }
}
