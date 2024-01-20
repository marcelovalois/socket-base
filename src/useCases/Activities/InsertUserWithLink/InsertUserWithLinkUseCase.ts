import { IActivitiesRepository } from "../../../repositories/interfaces/IActivitiesRepository";
import { Participation } from "../../../entities/Participation";

export class InsertUserWithLinkUseCase {
  constructor(private activitiesRepository: IActivitiesRepository) {}

  async execute({ user_id, link }: Participation): Promise<void> {
    await this.activitiesRepository.addUserWithLinkToActivity({ user_id, link });
  }
}
