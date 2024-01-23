import { User } from "../../../entities/User";
import { IUsersRepository } from "../../../repositories/interfaces/IUsersRepository";

interface ICreateUserRequest {
  name: string;
  email: string;
  image: string;
  type: string;
}

export class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(data: ICreateUserRequest) {
    const userExists = await this.usersRepository.findByEmail(data.email);

    if (userExists) {
      throw new Error(`User ${data.name} already exists`);
    }

    const user = new User(data);

    const userData = await this.usersRepository.insertUser(user);

    return userData;
  }
}
