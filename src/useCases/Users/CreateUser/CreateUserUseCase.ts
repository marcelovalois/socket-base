import { User } from "../../../entities/User";
import { IUsersRepository } from "../../../repositories/interfaces/IUsersRepository";

interface ICreateUserRequestDTO {
  name: string;
  email: string;
  image: string | undefined;
  type: string | undefined;
}

export class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(data: ICreateUserRequestDTO) {
    // Check if user already exists
    const userExists = await this.usersRepository.findByEmail(data.email);

    if (userExists) {
      const error = new Error(`User with email: ${data.email} already exists`) as ErrorWithStatus;
      error.status = 409;
      throw error;
    }

    const user = new User(data);

    const userData = await this.usersRepository.insert(user);

    return userData;
  }
}
