import config from "../../../config/config";
import { User } from "../../../entities/User";
import { IUsersRepository } from "../../../repositories/interfaces/IUsersRepository";
import jwt from "jsonwebtoken";

interface ILoginRequestDTO {
  email: string;
}

interface UserWithToken extends User {
  token: string;
}

export class LoginUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute = async (data: ILoginRequestDTO): Promise<UserWithToken | null> => {
    try {
      const { email } = data;

      const user = await this.usersRepository.findByEmail(email);
      if (!user) return null;

      const token = jwt.sign({ id: user.id }, config.jwt.secret, { expiresIn: config.jwt.expiresIn });

      return { ...user, token };
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  };
}
