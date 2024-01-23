import { User } from "../../../entities/User";
import { IUsersRepository } from "../../../repositories/interfaces/IUsersRepository";

export class FindUserByEmailUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute = async (email: string) => {
    const user: User | null = await this.usersRepository.findByEmail(email);
    return user;
  };
}
