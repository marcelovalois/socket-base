import { IActivitiesRepository } from "../../../repositories/interfaces/IActivitiesRepository";

interface IListActivitiesByCreatorIdRequestDTO {
  user_id: number;
}

export class ListActivitiesByCreatorIdUseCase {
  constructor(private activitiesRepository: IActivitiesRepository) {}

  async execute(data: IListActivitiesByCreatorIdRequestDTO) {
    const activities = await this.activitiesRepository.listByCreator(data.user_id);

    return activities;
  }
}
