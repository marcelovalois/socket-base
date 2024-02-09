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
        select: {
          id: true,
          title: true,
          link: true,
          user_id: true,
          updated_at: true,
          user: {
            select: {
              name: true,
            },
          },
          phrases: {
            select: {
              text: true,
              order: true,
            },
          },
          participations: {
            select: {
              id: true,
              user_id: true,
              user: {
                select: {
                  name: true,
                  type: true,
                },
              },
            },
          },
        },
      });

      return new Activity(
        {
          title: result.title,
          link: result.link,
          user_id: result.user_id,
          creator_name: result.user.name,
          phrases: result.phrases,
          members: result.participations.map((participation) => ({
            participation_id: participation.id,
            user_id: participation.user_id,
            user_name: participation.user.name,
            user_type: participation.user.type,
          })),
        },
        result.id,
      );
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
        select: {
          id: true,
          title: true,
          link: true,
          user_id: true,
          updated_at: true,
          user: {
            select: {
              name: true,
            },
          },
          phrases: {
            select: {
              text: true,
              order: true,
            },
          },
          participations: {
            select: {
              id: true,
              user_id: true,
              user: {
                select: {
                  name: true,
                  type: true,
                },
              },
            },
          },
        },
      });

      if (activity) {
        return new Activity({
          title: activity.title,
          link: activity.link,
          user_id: activity.user_id,
          creator_name: activity.user.name,
          updated_at: activity.updated_at,
          phrases: activity.phrases,
          members: activity.participations.map((participation) => ({
            user_id: participation.user_id,
            user_name: participation.user.name,
            user_type: participation.user.type,
          })),
        });
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
      const activities = await prismaClient.activity.findMany({
        select: {
          id: true,
          title: true,
          link: true,
          user_id: true,
          user: {
            select: {
              name: true,
            },
          },
          phrases: {
            select: {
              id: true,
              text: true,
              order: true,
            },
          },
          participations: {
            select: {
              id: false,
              user_id: true,
              user: {
                select: {
                  name: true,
                  type: true,
                },
              },
            },
          },

          created_at: false,
          updated_at: true,
          deleted_at: false,
        },
      });

      return activities.map((activity) => {
        return new Activity(
          {
            title: activity.title,
            link: activity.link,
            user_id: activity.user_id,
            creator_name: activity.user.name,
            updated_at: activity.updated_at,
            phrases: activity.phrases,
            members: activity.participations.map((participation) => ({
              user_id: participation.user_id,
              user_name: participation.user.name,
              user_type: participation.user.type,
            })),
          },
          activity.id,
        );
      });
    } catch (error) {
      throw new Error(`Error: ${error}`);
    } finally {
      await prismaClient.$disconnect();
    }
  }

  async listByCreator(id: number): Promise<Activity[]> {
    try {
      const activities = await prismaClient.activity.findMany({
        where: {
          user_id: id,
        },
        select: {
          id: true,
          title: true,
          link: true,
          user_id: true,
          phrases: {
            select: {
              id: true,
              text: true,
              order: true,
            },
          },
          participations: {
            select: {
              id: false,
              user_id: true,
              user: {
                select: {
                  name: true,
                  type: true,
                },
              },
            },
          },

          created_at: false,
          updated_at: false,
          deleted_at: false,
        },
      });

      return activities.map((activity) => {
        return new Activity(
          {
            title: activity.title,
            link: activity.link,
            user_id: activity.user_id,
            phrases: activity.phrases,
            members: activity.participations.map((participation) => ({
              user_id: participation.user_id,
              user_name: participation.user.name,
              user_type: participation.user.type,
            })),
          },
          activity.id,
        );
      });
    } catch (error) {
      throw new Error(`Error: ${error}`);
    } finally {
      await prismaClient.$disconnect();
    }
  }

  async addUserWithLinkToActivity(participation: Participation): Promise<void> {
    try {
      const activity = await prismaClient.activity.findFirst({
        where: {
          link: participation.link,
        },
      });

      if (!activity) throw new Error("Activity not found");

      const participationAlreadyExists = await prismaClient.participation.findFirst({
        where: {
          user_id: participation.user_id,
          activity_id: activity.id,
        },
      });

      if (participationAlreadyExists) throw new Error("User already in activity.");

      await prismaClient.participation.create({
        data: {
          user_id: participation.user_id!,
          activity_id: activity.id,
        },
      });
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

      if (participationAlreadyExists) throw new Error("User already in activity.");

      await prismaClient.participation.create({
        data: {
          user_id: participation.user_id!,
          activity_id: participation.activity_id!,
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
          id: false,
          user_id: true,
          activity_id: true,
          user: {
            select: {
              name: true,
              type: true,
            },
          },

          created_at: false,
          updated_at: false,
          deleted_at: false,
        },
      });

      return participations.map((participation) => {
        return new Participation({
          user_id: participation.user_id,
          activity_id: participation.activity_id,
          user_name: participation.user.name,
          user_type: participation.user.type,
        });
      });
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

      if (!participationToDelete) throw new Error("User is not in activity.");

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
