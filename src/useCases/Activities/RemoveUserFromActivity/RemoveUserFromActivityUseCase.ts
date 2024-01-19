import { IActivitiesRepository } from "../../../repositories/interfaces/IActivitiesRepository";
import { Participation } from "../../../entities/Participation";

export class RemoveUserFromActivityUseCase {
  constructor(private activitiesRepository: IActivitiesRepository) {}

  async execute(participation: Participation): Promise<void> {
    await this.activitiesRepository.removeUserFromActivity(participation);
  }
}
