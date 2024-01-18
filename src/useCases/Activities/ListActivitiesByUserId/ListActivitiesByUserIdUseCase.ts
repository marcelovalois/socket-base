import { IActivitiesRepository } from "../../../repositories/interfaces/IActivitiesRepository";

interface IListActivitiesByUserIdRequest {
  user_id: number;
}

export class ListActivitiesByUserIdUseCase {
  constructor(private activitiesRepository: IActivitiesRepository) {}

  async execute({ user_id }: IListActivitiesByUserIdRequest) {
    const activities = await this.activitiesRepository.listByUser(user_id);

    return activities;
  }
}
