import { IExecutionsRepository } from "../../../repositories/interfaces/IExecutionsRepository";

export class ListExecutionsByActivityUseCase {
  constructor(private executionsRepository: IExecutionsRepository) {}

  async execute(activity_id: number) {
    const executions = await this.executionsRepository.listByActivity(activity_id);

    return executions;
  }
}
