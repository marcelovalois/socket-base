import { Execution } from "../entities/Execution";

export interface IExecutionsRepository {
  ListByUser(id: number): Promise<Execution[]>;
  ListByActivity(id: number): Promise<Execution[]>;
  SendExecution(execution: Execution): void;
}
