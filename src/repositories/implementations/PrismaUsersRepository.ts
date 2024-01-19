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
        return new User({
          name: result.name,
          image: result.image,
          type: result.type,
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

  async findByName(username: string): Promise<User | null> {
    try {
      // Busca o usuário pelo nome
      const result = await prismaClient.user.findFirst({
        where: {
          name: username,
        },
      });

      // Se o usuário existir, retorna o usuário
      if (result) {
        return new User({
          name: result.name,
          image: result.image,
          type: result.type,
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
    const { name, image, type } = user;
    try {
      // Salva o usuário
      const savedUser = await prismaClient.user.create({
        data: {
          name,
          image,
          type,
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
