export class Phrase {
  public text!: string;
  public activity_id!: number;
  public id?: number;
  public order!: number;

  constructor(props: Omit<Phrase, "id">, id?: number) {
    Object.assign(this, props);

    if (id) {
      this.id = id;
    }
  }
}
