import { User } from "../../../entities/User";
import { IUsersRepository } from "../../../repositories/interfaces/IUsersRepository";

interface ILoginRequest {
  email: string;
}

export class LoginUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute = async (data: ILoginRequest): Promise<User | null> => {
    try {
      const result = await this.usersRepository.loginWithEmail(data.email);

      return result;
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  };
}
