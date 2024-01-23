import { PrismaUsersRepository } from "../../../repositories/implementations/PrismaUsersRepository";
import { UpdateUserController } from "./UpdateUserController";
import { UpdateUserUseCase } from "./UpdateUserUseCase";

const prismaUsersRepository = new PrismaUsersRepository();

const updateUserUseCase = new UpdateUserUseCase(prismaUsersRepository);

const updateUserController = new UpdateUserController(updateUserUseCase);

export { updateUserController, updateUserUseCase };
