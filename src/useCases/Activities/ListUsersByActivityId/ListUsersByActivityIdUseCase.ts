import { IActivitiesRepository } from "../../../repositories/interfaces/IActivitiesRepository";
import { Participation } from "../../../entities/Participation";

export class ListUsersByActivityIdUseCase {
  constructor(private activitiesRepository: IActivitiesRepository) {}

  async execute(activity_id: number): Promise<Participation[]> {
    const users = await this.activitiesRepository.listUsersByActivity(activity_id);

    return users;
  }
}
