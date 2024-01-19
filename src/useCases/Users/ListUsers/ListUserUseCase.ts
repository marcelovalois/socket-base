import { IUsersRepository } from "../../../repositories/interfaces/IUsersRepository";

export class ListUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute = async () => {
    const users = await this.usersRepository.listAll();
    return users;
  };
}
