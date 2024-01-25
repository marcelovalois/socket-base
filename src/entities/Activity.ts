import { Execution } from "./Execution";
import { Phrase } from "./Phrase";
import { Participation } from "./Participation";

export class Activity {
  public id?: number;
  public user_id?: number;
  public creator_name?: string;
  public title?: string = "";
  public link?: string | null;
  public phrases?: Phrase[] | [];
  public executions?: Execution[] | [];
  public members?: Participation[] | [];

  constructor(props: Omit<Activity, "id">, id?: number) {
    Object.assign(this, props);

    if (id) {
      this.id = id;
    }
  }
}
