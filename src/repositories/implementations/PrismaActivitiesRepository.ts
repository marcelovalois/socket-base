import { prismaClient } from "../../databases/prismaClient";
import { Activity } from "../../entities/Activity";
import { Participation } from "../../entities/Participation";
import { IActivitiesRepository } from "../interfaces/IActivitiesRepository";

export class PrismaActivitiesRepository implements IActivitiesRepository {
  constructor() {}

  async createActivity(activity: Activity): Promise<Activity> {
    try {
      const createPayload = {
        title: activity.title!,
        user_id: activity.user_id!,
        participations: {
          create: {
            user_id: activity.user_id!,
          },
        },
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

      const result = await prismaClient.activity.create({
        data: createPayload,
        include: { phrases: true, participations: true },
      });

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

  async findById(id: number): Promise<Activity | null> {
    try {
      const activity = await prismaClient.activity.findUnique({
        where: {
          id,
        },
        include: {
          phrases: true,
          participations: true,
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

  async listByCreator(id: number): Promise<Activity[]> {
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

  async addUserToActivity(participation: Participation): Promise<void> {
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

  async listUsersByActivity(id: number): Promise<Participation[]> {
    try {
      const participations = await prismaClient.participation.findMany({
        where: {
          activity_id: id,
        },
        select: {
          id: true,
          user_id: true,
          activity_id: true,
          activity: {
            select: {
              title: true,
            },
          },

          created_at: false,
          updated_at: false,
          deleted_at: false,
        },
      });

      const parsedParticipations = participations.map((participation) => {
        return new Participation(
          {
            user_id: participation.user_id,
            activity_id: participation.activity_id,
            activity_title: participation.activity.title,
          },
          participation.id,
        );
      });

      return parsedParticipations;
    } catch (error) {
      throw new Error(`Error: ${error}`);
    } finally {
      await prismaClient.$disconnect();
    }
  }

  async removeUserFromActivity(participation: Participation): Promise<void> {
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
}
