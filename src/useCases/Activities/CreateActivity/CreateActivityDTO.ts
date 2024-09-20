import { Activity } from "../../../entities/Activity";

export interface ICreateActivityResponseDTO extends Activity {
  creator_name: string;
  updated_at?: Date;
}
