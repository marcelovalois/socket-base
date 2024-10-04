import { Activity } from "../../entities/Activity";
import { Participation } from "../../entities/Participation";
import { ICreateActivityResponseDTO } from "../../useCases/Activities/CreateActivity/CreateActivityDTO";

export interface IActivitiesRepository {
  create(activity: Activity): Promise<ICreateActivityResponseDTO>;
  list(): Promise<Activity[]>;
  findById(id: number): Promise<Activity | null>;
  findBySlug(slug: string): Promise<Activity | null>;
  listByCreator(id: number): Promise<Activity[]>;
  updateActivity(activity: Activity): Promise<void>;
  deleteActivity(id: number): Promise<void>;
  addUserToActivity(participation: Participation): Promise<void>;
  addUserWithLinkToActivity(participation: Participation): Promise<void>;
  removeUserFromActivity(participation: Participation): Promise<void>;
  listUsersByActivity(id: number): Promise<Participation[]>;
}
