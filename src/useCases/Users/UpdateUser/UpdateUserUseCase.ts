import { IUsersRepository } from "../../../repositories/interfaces/IUsersRepository";
import { User } from "../../../entities/User";

interface IUpdateUserRequestDTO {
  id: number;
  name?: string;
  email?: string;
  image?: string;
  type?: string;
}

export class UpdateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute = async (data: IUpdateUserRequestDTO) => {
    // Check if user already exists
    const userExists = await this.usersRepository.findById(data.id);

    if (!userExists) {
      throw new Error(`User ${data.id} not found`);
    }

    // Check if email is already in use
    if (data.email) {
      const user = await this.usersRepository.findByEmail(data.email);

      if (user && user.id !== data.id) {
        throw new Error(`Email ${data.email} already in use`);
      }
    }

    const user = new User(data, data.id);
    await this.usersRepository.update(user);
  };
}
