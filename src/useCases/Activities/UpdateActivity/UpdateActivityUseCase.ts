import { IActivitiesRepository } from "../../../repositories/interfaces/IActivitiesRepository";
import { Phrase } from "../../../entities/Phrase";

interface IUpdateActivityRequest {
  id: number;
  title?: string;
  phrases?: Phrase[];
}

export class UpdateActivityUseCase {
  constructor(private activitiesRepository: IActivitiesRepository) {}

  async execute({ id, title, phrases }: IUpdateActivityRequest): Promise<void> {
    const activity = await this.activitiesRepository.findById(id);

    if (!activity) {
      throw new Error("Activity not found");
    }

    await this.activitiesRepository.updateActivity({
      id,
      title,
      phrases,
    });
  }
}
