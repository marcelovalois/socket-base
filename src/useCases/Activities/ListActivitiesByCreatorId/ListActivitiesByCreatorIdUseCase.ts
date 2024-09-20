import { IActivitiesRepository } from "../../../repositories/interfaces/IActivitiesRepository";

interface IListActivitiesByCreatorIdRequest {
  user_id: number;
}

export class ListActivitiesByCreatorIdUseCase {
  constructor(private activitiesRepository: IActivitiesRepository) {}

  async execute(data: IListActivitiesByCreatorIdRequest) {
    const activities = await this.activitiesRepository.listByCreator(data.user_id);

    return activities;
  }
}
