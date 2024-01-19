import { Participation } from "../../entities/Participation";

export interface IParticipationsRepository {
  addParticipation(participation: Participation): Promise<void>;
  removeParticipation(participation: Participation): Promise<void>;
  listActivitiesByUser(id: number): Promise<Participation[]>;
  listUsersByActivity(id: number): Promise<Participation[]>;
}
