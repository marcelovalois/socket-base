import { IActivitiesRepository } from "../../../repositories/interfaces/IActivitiesRepository";
import { Participation } from "../../../entities/Participation";

export class InsertUserToActivityUseCase {
  constructor(private activitiesRepository: IActivitiesRepository) {}

  async execute(participation: Participation): Promise<void> {
    await this.activitiesRepository.addUserToActivity(participation);
  }
}
