import { IActivitiesRepository } from "../../../repositories/interfaces/IActivitiesRepository";

export class FindActivityByIdUseCase {
  constructor(private activitiesRepository: IActivitiesRepository) {}

  async execute(id: number) {
    const activity = await this.activitiesRepository.findById(id);

    return activity;
  }
}
