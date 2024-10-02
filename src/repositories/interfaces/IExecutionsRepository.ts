import { Phrase } from "../../entities/Phrase";

export interface IExecutionsRepository {
  savePhrase(phrase: Phrase): Promise<void>;
  getActivityLastPhrase(activity_id: number): Promise<Phrase | null>;
}
