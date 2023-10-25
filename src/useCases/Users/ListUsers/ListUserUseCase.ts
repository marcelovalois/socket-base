import { User } from "../../../entities/User";
import { IUsersRepository } from "../../../repositories/IUsersRepository";

export class ListUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute = async () => {
    const users: User[] = await this.usersRepository.list();
    return users;
  };
}
