import { IExecutionsRepository } from "../../../repositories/interfaces/IExecutionsRepository";

interface IListExecutionsByActivityRequest {
  activity_id: number;
}

export class ListExecutionsByActivityUseCase {
  constructor(private executionsRepository: IExecutionsRepository) {}

  async execute({ activity_id }: IListExecutionsByActivityRequest) {
    const executions = await this.executionsRepository.listByActivity(activity_id);

    return executions;
  }
}
