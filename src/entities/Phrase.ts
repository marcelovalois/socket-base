export class Phrase {
  public id?: number;
  public text: string = "";
  public order: number = 0;
  public activity_id!: number;

  constructor(props: Omit<Phrase, "id">, id?: number) {
    Object.assign(this, props);

    if (id) {
      this.id = id;
    }
  }
}
