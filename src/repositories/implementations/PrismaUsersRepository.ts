/* eslint-disable @typescript-eslint/no-unused-vars */
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";
import { prismaClient } from "../../databases/prismaClient";

export class PrismaUsersRepository implements IUsersRepository {
  constructor() {}

  async findById(id: number): Promise<User | null> {
    try {
      const result = await prismaClient.user.findUnique({
        where: {
          id,
        },
      });

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
      const result = await prismaClient.user.findFirst({
        where: {
          name: username,
        },
      });

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

  async save(user: User): Promise<void> {
    const { name, image, type } = user;
    try {
      const savedUser = await prismaClient.user.create({
        data: {
          name,
          image,
          type,
        },
      });
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  }

  async list(): Promise<User[]> {
    try {
      const result: User[] = await prismaClient.user.findMany();

      return result;
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  }

  remove(user: User): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
