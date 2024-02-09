import { IUsersRepository } from "../../../repositories/interfaces/IUsersRepository";
import { User } from "../../../entities/User";

interface IAuthTokenRequest {
  token: string;
}
export class AuthTokenUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute = async (data: IAuthTokenRequest): Promise<User | null> => {
    try {
      const result = await this.usersRepository.authToken(data.token);

      return result;
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  };
}
