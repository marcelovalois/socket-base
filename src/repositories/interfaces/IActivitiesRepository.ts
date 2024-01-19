import { Activity } from "../../entities/Activity";
import { Participation } from "../../entities/Participation";

export interface IActivitiesRepository {
  findById(id: number): Promise<Activity | null>;
  listAll(): Promise<Activity[]>;
  listByCreator(id: number): Promise<Activity[]>;
  createActivity(activity: Activity): Promise<Activity>;
  updateActivity(activity: Activity): Promise<void>;
  deleteActivity(id: number): Promise<void>;
  addUserToActivity(participation: Participation): Promise<void>;
  removeUserFromActivity(participation: Participation): Promise<void>;
  listUsersByActivity(id: number): Promise<Participation[]>;
}
