import { PrismaUsersRepository } from "../../../repositories/implementations/PrismaUsersRepository";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { CreateUserController } from "./CreateUserController";

const prismaUsersRepository = new PrismaUsersRepository();

const createUserUseCase = new CreateUserUseCase(prismaUsersRepository);

console.log(typeof createUserUseCase);

const createUserController = new CreateUserController(createUserUseCase);

export { createUserUseCase, createUserController };
