import { IUsersRepository } from "../../../repositories/interfaces/IUsersRepository";

export class RemoveUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute = async (id: number) => {
    const userData = await this.usersRepository.remove(id);

    return userData;
  };
}
