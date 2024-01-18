import { Execution } from "./Execution";
import { Phrase } from "./Phrase";

export class Activity {
  public id?: number;
  public user_id!: number;
  public title: string = "";
  public link?: string | null;
  public phrases?: Phrase[] | [];
  public executions?: Execution[] | [];

  constructor(props: Omit<Activity, "id">, id?: number) {
    Object.assign(this, props);

    if (id) {
      this.id = id;
    }
  }
}
