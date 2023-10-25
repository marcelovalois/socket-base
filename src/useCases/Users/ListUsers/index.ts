import { PrismaUsersRepository } from "../../../repositories/implementations/PrismaUsersRepository";
import { ListUserController } from "./ListUserController";
import { ListUserUseCase } from "./ListUserUseCase";

const prismaUsersRepository = new PrismaUsersRepository();

const listUserUseCase = new ListUserUseCase(prismaUsersRepository);

const listUserController = new ListUserController(listUserUseCase);

export { listUserController };
