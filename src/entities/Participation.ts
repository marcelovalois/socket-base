import { Phrase } from "./Phrase";

export class Participation {
  public id?: number;
  public user_id!: number;
  public activity_id?: number;
  public activity_title?: string;
  public user_name?: string;
  public user_type?: string | null;
  public link?: string | null;
  public phrases?: Phrase[] | [];
  public creator_name?: string;
  public members?: Participation[] | [];
  public updated_at?: Date;

  constructor(props: Omit<Participation, "id">, id?: number) {
    Object.assign(this, props);

    if (id) {
      this.id = id;
    }
  }
}
