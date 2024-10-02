import { prismaClient } from "../../databases/prismaClient";
import { Phrase } from "../../entities/Phrase";
import { IExecutionsRepository } from "../interfaces/IExecutionsRepository";

export class PrismaExecutionsRepository implements IExecutionsRepository {
  constructor() {}
  async getActivityLastPhrase(activity_id: number): Promise<Phrase | null> {
    try {
      const result = await prismaClient.phrase.findFirst({
        where: {
          activity_id,
        },
        orderBy: {
          order: "desc",
        },
      });

      const phrase = result ? new Phrase({ text: result.text, activity_id }) : null;
      return phrase;
    } catch (error) {
      throw new Error(`Error: ${error}`);
    } finally {
      prismaClient.$disconnect();
    }
  }
  async savePhrase(phrase: Phrase): Promise<void> {
    try {
      await prismaClient.phrase.create({
        data: {
          text: phrase.text,
          activity_id: phrase.activity_id,
        },
      });
    } catch (error) {
      throw new Error(`Error: ${error}`);
    } finally {
      await prismaClient.$disconnect();
    }
  }
}
