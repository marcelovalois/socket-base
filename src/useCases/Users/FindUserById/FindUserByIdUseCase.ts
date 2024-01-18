import { User } from "../../../entities/User";
import { IUsersRepository } from "../../../repositories/interfaces/IUsersRepository";

interface IFindUserByIdRequest {
  id: number;
}

export class FindUserByIdUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute = async (data: IFindUserByIdRequest) => {
    const user: User | null = await this.usersRepository.findById(data.id);
    return user;
  };
}
