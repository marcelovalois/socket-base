import { IActivitiesRepository } from "../../../repositories/interfaces/IActivitiesRepository";

interface ICreateActivityRequest {
  user_id: number;
  title: string;
}

export class CreateActivityUseCase {
  constructor(private activitiesRepository: IActivitiesRepository) {}

  async execute({ user_id, title }: ICreateActivityRequest) {
    const activityId = await this.activitiesRepository.createActivity({
      user_id,
      title,
    });

    return activityId;
  }
}
