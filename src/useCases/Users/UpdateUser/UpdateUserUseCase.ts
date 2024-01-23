import { IUsersRepository } from "../../../repositories/interfaces/IUsersRepository";
import { User } from "../../../entities/User";

export class UpdateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute = async (user: User) => {
    await this.usersRepository.updateUser(user);
  };
}
