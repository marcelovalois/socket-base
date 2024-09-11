import { IActivitiesRepository } from "../../../repositories/interfaces/IActivitiesRepository";

export class ListActivitiesUseCase {
  constructor(private activityRepository: IActivitiesRepository) {}

  async execute() {
    const activities = await this.activityRepository.list();

    return activities;
  }
}
