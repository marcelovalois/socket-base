import { Execution } from "../../entities/Execution";
import { IExecutionsRepository } from "../IExecutionsRepository";

export class PrismaExecutionsRepository implements IExecutionsRepository {
  constructor() {}

  ListByUser(id: number): Promise<Execution[]> {
    throw new Error("Method not implemented.");
  }
  ListByActivity(id: number): Promise<Execution[]> {
    throw new Error("Method not implemented.");
  }
  SendExecution(execution: Execution): void {
    throw new Error("Method not implemented.");
  }
}
