import { Execution } from "../../entities/Execution";

export interface IExecutionsRepository {
  listByUser(id: number): Promise<Execution[]>;
  listByActivity(id: number): Promise<Execution[]>;
  createExecution(execution: Execution): Promise<void>;
}
