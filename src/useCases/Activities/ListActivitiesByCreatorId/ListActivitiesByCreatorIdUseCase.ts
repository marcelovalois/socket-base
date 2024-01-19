import { IActivitiesRepository } from "../../../repositories/interfaces/IActivitiesRepository";

export class ListActivitiesByCreatorIdUseCase {
  constructor(private activitiesRepository: IActivitiesRepository) {}

  async execute(user_id: number) {
    const activities = await this.activitiesRepository.listByCreator(user_id);

    return activities;
  }
}
