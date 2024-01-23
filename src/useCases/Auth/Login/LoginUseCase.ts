import { IUsersRepository } from "../../../repositories/interfaces/IUsersRepository";

interface ILoginRequest {
  email: string;
  password: string;
}

export class LoginUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute = async (data: ILoginRequest): Promise<string | null> => {
    try {
      const user = await this.usersRepository.findByEmail(data.email);

      if (!user) {
        return null;
      }

      console.log(user);

      return "token";
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  };
}
