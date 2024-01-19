import { Activity } from "../../entities/Activity";

export interface IActivitiesRepository {
  findById(id: number): Promise<Activity | null>;
  listAll(): Promise<Activity[]>;
  listByUser(id: number): Promise<Activity[]>;
  createActivity(activity: Activity): Promise<Activity>;
  updateActivity(activity: Activity): Promise<void>;
  deleteActivity(id: number): Promise<void>;
}
