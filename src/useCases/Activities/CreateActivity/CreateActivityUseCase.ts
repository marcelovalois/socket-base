import { Activity } from "../../../entities/Activity";
import { Phrase } from "../../../entities/Phrase";
import { IActivitiesRepository } from "../../../repositories/interfaces/IActivitiesRepository";

interface ICreateActivityRequest {
  user_id: number;
  title: string;
  phrases?: Phrase[];
}

export class CreateActivityUseCase {
  constructor(private activitiesRepository: IActivitiesRepository) {}

  async execute({ user_id, title, phrases }: ICreateActivityRequest): Promise<Activity> {
    const activity = await this.activitiesRepository.createActivity({
      user_id,
      title,
      phrases,
    });

    return activity;
  }
}
