import { IExecutionsRepository } from "../../../repositories/interfaces/IExecutionsRepository";

interface ISendExecutionRequest {
  user_id: number;
  message: string;
  activity_id: number;
  pontuando_quote: boolean;
}

export class SendExecutionUseCase {
  constructor(private executionsRepository: IExecutionsRepository) {}

  async execute({ user_id, activity_id, message, pontuando_quote }: ISendExecutionRequest) {
    const executionId = this.executionsRepository.createExecution({
      user_id,
      activity_id,
      message,
      pontuando_quote,
    });

    return executionId;
  }
}
