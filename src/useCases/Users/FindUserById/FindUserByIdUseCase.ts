import { User } from "../../../entities/User";
import { IUsersRepository } from "../../../repositories/interfaces/IUsersRepository";

interface IFindUserByIdRequestDTO {
  id: number;
}

export class FindUserByIdUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute = async (data: IFindUserByIdRequestDTO) => {
    const { id } = data;

    const user: User | null = await this.usersRepository.findById(id);
    return user;
  };
}
