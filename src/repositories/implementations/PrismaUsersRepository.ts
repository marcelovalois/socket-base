import { User } from "../../entities/User";
import { Participation } from "../../entities/Participation";
import { IUsersRepository } from "../interfaces/IUsersRepository";
import { prismaClient } from "../../databases/prismaClient";

export class PrismaUsersRepository implements IUsersRepository {
  constructor() {}

  async findById(id: number): Promise<User | null> {
    try {
      // Busca o usuário pelo id
      const result = await prismaClient.user.findUnique({
        where: {
          id,
        },
      });

      // Se o usuário existir, retorna o usuário
      if (result) {
        return new User(
          {
            name: result.name,
            image: result.image,
            type: result.type,
            email: result.email,
          },
          result.id,
        );
      } else {
        return null;
      }
    } catch (error) {
      throw new Error(`Error: ${error}`);
    } finally {
      await prismaClient.$disconnect();
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      // Busca o usuário pelo nome
      const user = await prismaClient.user.findFirst({
        where: {
          email,
        },
      });

      // Se o usuário existir, retorna o usuário
      if (user) {
        return new User({
          name: user.name,
          image: user.image,
          type: user.type,
          email: user.email,
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

  async insertUser(user: User): Promise<User> {
    const { name, email, image, type } = user;
    try {
      // Salva o usuário
      const savedUser = await prismaClient.user.create({
        data: {
          name: name!,
          image,
          type,
          email: email!,
        },
      });

      return savedUser;
    } catch (error) {
      throw new Error(`Error: ${error}`);
    } finally {
      await prismaClient.$disconnect();
    }
  }

  async listAll(): Promise<User[]> {
    try {
      // Lista todos os usuários
      const result = await prismaClient.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          type: true,

          created_at: false,
          updated_at: false,
          deleted_at: false,
        },
      });

      return result;
    } catch (error) {
      throw new Error(`Error: ${error}`);
    } finally {
      await prismaClient.$disconnect();
    }
  }

  async updateUser(user: User): Promise<void> {
    try {
      // Checa se o usuário existe
      const userExists = await prismaClient.user.findUnique({
        where: {
          id: user.id,
        },
      });

      if (!userExists) throw new Error("Usuário não encontrado");

      const updatePayload = {};

      if (user.name) Object.assign(updatePayload, { name: user.name });
      if (user.email) Object.assign(updatePayload, { email: user.email });
      if (user.image) Object.assign(updatePayload, { image: user.image });
      if (user.type) Object.assign(updatePayload, { type: user.type });

      // Atualiza o usuário
      await prismaClient.user.update({
        where: {
          id: user.id,
        },
        data: updatePayload,
      });
    } catch (error) {
      throw new Error(`Error: ${error}`);
    } finally {
      await prismaClient.$disconnect();
    }
  }

  async removeUser(id: number): Promise<User> {
    try {
      // Checa se o usuário existe
      const user = await prismaClient.user.findUnique({
        where: {
          id,
        },
      });

      if (!user) throw new Error("Usuário não encontrado");

      // Deleta o usuário
      const result: User = await prismaClient.user.delete({
        where: {
          id: user.id,
        },
      });

      // Retorna o usuário deletado
      return result;
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
        select: {
          id: true,
          user_id: true,
          activity_id: true,
          activity: {
            select: {
              title: true,
              user_id: true,
              link: true,
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
                  user_id: true,
                  user: {
                    select: {
                      name: true,
                    },
                  },
                },
              },
            },
          },

          created_at: false,
          updated_at: false,
          deleted_at: false,
        },
      });

      return participations.map((participation) => {
        return new Participation(
          {
            user_id: participation.user_id,
            activity_id: participation.activity_id,
            activity_title: participation.activity.title,
            link: participation.activity.link,
            creator_name: participation.activity.user.name,
            updated_at: participation.activity.updated_at,
            phrases: participation.activity.phrases,
            members: participation.activity.participations.map((member) => ({
              user_id: member.user_id,
              user_name: member.user.name,
            })),
          },
          participation.id,
        );
      });
    } catch (error) {
      throw new Error(`Error: ${error}`);
    } finally {
      await prismaClient.$disconnect();
    }
  }
}
