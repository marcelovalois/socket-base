import { IUsersRepository } from "../../../repositories/interfaces/IUsersRepository";

export class ListUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute() {
    const users = await this.usersRepository.list();
    return users;
  }
}
