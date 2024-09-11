import { Activity } from "../../entities/Activity";
import { Participation } from "../../entities/Participation";

export interface IActivitiesRepository {
  create(activity: Activity): Promise<Activity>;
  list(): Promise<Activity[]>;
  findById(id: number): Promise<Activity | null>;
  listByCreator(id: number): Promise<Activity[]>;
  updateActivity(activity: Activity): Promise<void>;
  deleteActivity(id: number): Promise<void>;
  addUserToActivity(participation: Participation): Promise<void>;
  addUserWithLinkToActivity(participation: Participation): Promise<void>;
  removeUserFromActivity(participation: Participation): Promise<void>;
  listUsersByActivity(id: number): Promise<Participation[]>;
}
