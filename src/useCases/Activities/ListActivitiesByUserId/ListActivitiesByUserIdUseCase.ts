import { IActivitiesRepository } from "../../../repositories/interfaces/IActivitiesRepository";

export class ListActivitiesByUserIdUseCase {
  constructor(private activitiesRepository: IActivitiesRepository) {}

  async execute(user_id: number) {
    const activities = await this.activitiesRepository.listByUser(user_id);

    return activities;
  }
}
