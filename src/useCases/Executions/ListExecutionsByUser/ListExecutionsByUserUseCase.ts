import { IExecutionsRepository } from "../../../repositories/interfaces/IExecutionsRepository";

export class ListExecutionsByUserUseCase {
  constructor(private executionsRepository: IExecutionsRepository) {}

  async execute(user_id: number) {
    const executions = await this.executionsRepository.listByUser(user_id);

    return executions;
  }
}
