import { IExecutionsRepository } from "../../../repositories/interfaces/IExecutionsRepository";

interface IListExecutionsByUserRequest {
  user_id: number;
}

export class ListExecutionsByUserUseCase {
  constructor(private executionsRepository: IExecutionsRepository) {}

  async execute({ user_id }: IListExecutionsByUserRequest) {
    const executions = await this.executionsRepository.listByUser(user_id);

    return executions;
  }
}
