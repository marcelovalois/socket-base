import { IUsersRepository } from "../../../repositories/interfaces/IUsersRepository";

export class RemoveUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute = async (id: number) => {
    // Check if user exists
    const user = await this.usersRepository.findById(id);

    // If user does not exist, throw an error
    if (!user) {
      const error = new Error(`User with id: ${id} does not exist`) as ErrorWithStatus;
      error.status = 404;
      throw error;
    }

    const userData = await this.usersRepository.delete(id);

    return userData;
  };
}
