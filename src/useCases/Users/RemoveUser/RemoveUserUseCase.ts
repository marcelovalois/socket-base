import { IUsersRepository } from "../../../repositories/IUsersRepository";

export class RemoveUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute = async (id: number) => {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    await this.usersRepository.remove(user);
  };
}
