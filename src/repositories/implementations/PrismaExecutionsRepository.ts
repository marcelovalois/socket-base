import { prismaClient } from "../../databases/prismaClient";
import { Execution } from "../../entities/Execution";
import { IExecutionsRepository } from "../interfaces/IExecutionsRepository";

export class PrismaExecutionsRepository implements IExecutionsRepository {
  constructor() {}

  async listByUser(id: number): Promise<Execution[]> {
    try {
      const executions = await prismaClient.execution.findMany({
        where: {
          user_id: id,
        },
        include: {
          activity: true,
          message: true,
        },
      });

      return executions.map((execution) => ({
        ...execution,
        pontuando_quote: execution.message.pontuando_quote,
        message: execution.message.text,
      }));
    } catch (error) {
      throw new Error(`Error: ${error}`);
    } finally {
      await prismaClient.$disconnect();
    }
  }
  async listByActivity(id: number): Promise<Execution[]> {
    try {
      const executions = await prismaClient.execution.findMany({
        where: {
          activity_id: id,
        },
        include: {
          activity: true,
          message: true,
        },
      });

      return executions.map((execution) => ({
        ...execution,
        pontuando_quote: execution.message.pontuando_quote,
        message: execution.message.text,
      }));
    } catch (error) {
      throw new Error(`Error: ${error}`);
    } finally {
      await prismaClient.$disconnect();
    }
  }

  async createExecution(execution: Execution): Promise<void> {
    if (!execution.message) throw new Error("Message is required");

    try {
      await prismaClient.message.create({
        data: {
          text: execution.message,
          user_id: execution.user_id,
          pontuando_quote: execution.pontuando_quote,
          executions: {
            create: {
              activity_id: execution.activity_id,
              user_id: execution.user_id,
            },
          },
        },
      });
    } catch (error) {
      throw new Error(`Error: ${error}`);
    } finally {
      await prismaClient.$disconnect();
    }
  }
}
