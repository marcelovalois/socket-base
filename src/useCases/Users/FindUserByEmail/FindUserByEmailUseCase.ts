import { User } from "../../../entities/User";
import { IUsersRepository } from "../../../repositories/interfaces/IUsersRepository";

interface IFindUserByEmailRequest {
  email: string;
}

export class FindUserByEmailUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(data: IFindUserByEmailRequest) {
    const { email } = data;

    const user: User | null = await this.usersRepository.findByEmail(email);
    return user;
  }
}
