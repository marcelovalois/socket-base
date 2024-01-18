import { prismaClient } from "../../databases/prismaClient";
import { Activity } from "../../entities/Activity";
import { IActivitiesRepository } from "../interfaces/IActivitiesRepository";

export class PrismaActivitiesRepository implements IActivitiesRepository {
  constructor() {}

  async findById(id: number): Promise<Activity | null> {
    try {
      const activity = await prismaClient.activity.findUnique({
        where: {
          id,
        },
      });

      if (activity) {
        return new Activity({ ...activity });
      } else {
        return null;
      }
    } catch (error) {
      throw new Error(`Error: ${error}`);
    } finally {
      await prismaClient.$disconnect();
    }
  }

  async listAll(): Promise<Activity[]> {
    try {
      const activities: Activity[] = await prismaClient.activity.findMany();

      return activities;
    } catch (error) {
      throw new Error(`Error: ${error}`);
    } finally {
      await prismaClient.$disconnect();
    }
  }

  async listByUser(id: number): Promise<Activity[]> {
    try {
      const activities: Activity[] = await prismaClient.activity.findMany({
        where: {
          user_id: id,
        },
      });

      return activities;
    } catch (error) {
      throw new Error(`Error: ${error}`);
    } finally {
      await prismaClient.$disconnect();
    }
  }

  async createActivity(activity: Activity): Promise<number> {
    try {
      const result = await prismaClient.activity.create({
        data: {
          title: activity.title,
          user_id: activity.user_id,
        },
      });

      return result.id;
    } catch (error) {
      throw new Error(`Error: ${error}`);
    } finally {
      await prismaClient.$disconnect();
    }
  }

  async updateActivity(activity: Activity): Promise<void> {
    try {
      // TODO: Implementar o update com frases
      await prismaClient.activity.update({
        where: {
          id: activity.id,
        },
        data: {
          title: activity.title,
        },
      });
    } catch (error) {
      throw new Error(`Error: ${error}`);
    } finally {
      await prismaClient.$disconnect();
    }
  }

  async deleteActivity(id: number): Promise<void> {
    try {
      await prismaClient.activity.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new Error(`Error: ${error}`);
    } finally {
      await prismaClient.$disconnect();
    }
  }
}
