import { User } from "../../../entities/User";
import { IUsersRepository } from "../../../repositories/interfaces/IUsersRepository";

interface IFindUserByEmailRequestDTO {
  email: string;
}

export class FindUserByEmailUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(data: IFindUserByEmailRequestDTO) {
    const { email } = data;

    const user: User | null = await this.usersRepository.findByEmail(email);
    return user;
  }
}
