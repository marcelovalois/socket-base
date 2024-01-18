import { Execution } from "./Execution";
import { Phrase } from "./Phrase";

export class Activity {
  public title!: string;
  public link?: string | null;
  public user_id!: number;
  public phrases?: Phrase[] | [];
  public executions?: Execution[] | [];
  public id?: number;

  constructor(props: Omit<Activity, "id">, id?: number) {
    Object.assign(this, props);

    if (id) {
      this.id = id;
    }
  }
}
