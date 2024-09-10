import { IUsersRepository } from "../../../repositories/interfaces/IUsersRepository";

export class RemoveUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute = async (id: number) => {
    // Check if user exists
    const user = await this.usersRepository.findById(id);

    // If user does not exist, throw an error
    if (!user) {
      throw new Error("User not found");
    }

    const userData = await this.usersRepository.delete(id);

    return userData;
  };
}
