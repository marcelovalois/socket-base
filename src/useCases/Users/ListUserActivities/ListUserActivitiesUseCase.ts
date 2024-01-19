import { IUsersRepository } from "../../../repositories/interfaces/IUsersRepository";
import { Participation } from "../../../entities/Participation";

export class ListUserActivitiesUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(id: number): Promise<Participation[]> {
    const activities = await this.usersRepository.listActivitiesByUser(id);

    return activities;
  }
}
