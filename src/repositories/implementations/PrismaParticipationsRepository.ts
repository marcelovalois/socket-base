import { prismaClient } from "../../databases/prismaClient";
import { IParticipationsRepository } from "../interfaces/IParticipationsRepository";
import { Participation } from "../../entities/Participation";

export class PrismaParticipationsRepostory implements IParticipationsRepository {
  constructor() {}

  async addParticipation(participation: Participation): Promise<void> {
    try {
      const participationAlreadyExists = await prismaClient.participation.findFirst({
        where: {
          user_id: participation.user_id,
          activity_id: participation.activity_id,
        },
      });

      if (participationAlreadyExists) {
        throw new Error("Participation already exists");
      }

      await prismaClient.participation.create({
        data: {
          user_id: participation.user_id,
          activity_id: participation.activity_id,
        },
      });
    } catch (error) {
      throw new Error(`Error: ${error}`);
    } finally {
      await prismaClient.$disconnect();
    }
  }

  async removeParticipation(participation: Participation): Promise<void> {
    try {
      const participationToDelete = await prismaClient.participation.findFirst({
        where: {
          user_id: participation.user_id,
          activity_id: participation.activity_id,
        },
      });

      if (!participationToDelete) {
        throw new Error("Participation not found");
      }

      await prismaClient.participation.delete({
        where: {
          id: participationToDelete.id,
        },
      });
    } catch (error) {
      throw new Error(`Error: ${error}`);
    } finally {
      await prismaClient.$disconnect();
    }
  }

  async listActivitiesByUser(id: number): Promise<Participation[]> {
    try {
      const participations = await prismaClient.participation.findMany({
        where: {
          user_id: id,
        },
      });

      return participations;
    } catch (error) {
      throw new Error(`Error: ${error}`);
    } finally {
      await prismaClient.$disconnect();
    }
  }

  async listUsersByActivity(id: number): Promise<Participation[]> {
    try {
      const participations = await prismaClient.participation.findMany({
        where: {
          activity_id: id,
        },
      });

      return participations;
    } catch (error) {
      throw new Error(`Error: ${error}`);
    } finally {
      await prismaClient.$disconnect();
    }
  }
}
