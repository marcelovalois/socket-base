import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";
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
    }
  }

  async save(user: User): Promise<User> {
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
    }
  }

  async list(): Promise<User[]> {
    try {
      // Lista todos os usuários
      const result: User[] = await prismaClient.user.findMany();

      return result;
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  }

  async remove(id: number): Promise<User> {
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
    }
  }
}
