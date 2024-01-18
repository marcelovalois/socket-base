import { IActivitiesRepository } from "../../../repositories/interfaces/IActivitiesRepository";

interface IDeleteActivityRequest {
  id: number;
}

export class DeleteActivityUseCase {
  constructor(private activitiesRepository: IActivitiesRepository) {}

  async execute({ id }: IDeleteActivityRequest): Promise<void> {
    const activity = await this.activitiesRepository.findById(id);

    if (!activity) {
      throw new Error("Activity not found");
    }

    await this.activitiesRepository.deleteActivity(id);
  }
}
