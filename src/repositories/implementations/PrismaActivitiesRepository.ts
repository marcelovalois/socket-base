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
        include: {
          phrases: true,
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

  async createActivity(activity: Activity): Promise<Activity> {
    try {
      const createPayload = {
        title: activity.title!,
        user_id: activity.user_id!,
      };

      if (activity.phrases && activity.phrases.length > 0) {
        Object.assign(createPayload, {
          phrases: {
            create: activity.phrases.map((phrase) => ({
              text: phrase.text,
              order: phrase.order,
            })),
          },
        });
      }

      const result = await prismaClient.activity.create({ data: createPayload, include: { phrases: true } });

      return result;
    } catch (error) {
      throw new Error(`Error: ${error}`);
    } finally {
      await prismaClient.$disconnect();
    }
  }

  async updateActivity(activity: Activity): Promise<void> {
    try {
      const updatePayload = {};

      if (activity.title) {
        Object.assign(updatePayload, { title: activity.title });
      }

      if (activity.phrases) {
        Object.assign(updatePayload, {
          phrases: {
            deleteMany: [{ activity_id: activity.id }],
            create: activity.phrases.map((phrase) => ({
              text: phrase.text,
              order: phrase.order,
            })),
          },
        });
      }

      await prismaClient.activity.update({
        where: {
          id: activity.id,
        },
        data: updatePayload,
      });
    } catch (error) {
      throw new Error(`Error: ${error}`);
    } finally {
      await prismaClient.$disconnect();
    }
  }

  async deleteActivity(id: number): Promise<void> {
    try {
      await prismaClient.$transaction([
        prismaClient.phrase.deleteMany({
          where: { activity_id: id },
        }),
        prismaClient.participation.deleteMany({
          where: { activity_id: id },
        }),
        prismaClient.activity.delete({
          where: { id },
        }),
      ]);
    } catch (error) {
      throw new Error(`Error: ${error}`);
    } finally {
      await prismaClient.$disconnect();
    }
  }
}
