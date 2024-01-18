import { PrismaUsersRepository } from "../../../repositories/implementations/PrismaUsersRepository";
import { CreateUserUseCase } from "./SendExecutionUseCase";
import { CreateUserController } from "./CreateUserController";

const prismaUsersRepository = new PrismaUsersRepository();

const createUserUseCase = new CreateUserUseCase(prismaUsersRepository);

const createUserController = new CreateUserController(createUserUseCase);

export { createUserUseCase, createUserController };
