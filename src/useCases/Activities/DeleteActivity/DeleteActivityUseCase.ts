import { IActivitiesRepository } from "../../../repositories/interfaces/IActivitiesRepository";

export class DeleteActivityUseCase {
  constructor(private activitiesRepository: IActivitiesRepository) {}

  async execute(id: number): Promise<void> {
    const activity = await this.activitiesRepository.findById(id);

    if (!activity) {
      throw new Error("Activity not found");
    }

    await this.activitiesRepository.deleteActivity(id);
  }
}
