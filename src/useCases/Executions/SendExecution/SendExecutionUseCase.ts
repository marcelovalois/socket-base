import { User } from "../../../entities/User";
import { IUsersRepository } from "../../../repositories/IUsersRepository";

interface ISendExecutionRequest {
  name: string;
  image: string;
  type: string;
}

export class SendExecutionUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(data: ISendExecutionRequest) {
    const userExists = await this.usersRepository.findByName(data.name);

    if (userExists) {
      throw new Error(`User ${data.name} already exists`);
    }

    const user = new User(data);

    const userData = await this.usersRepository.save(user);

    return userData;
  }
}
