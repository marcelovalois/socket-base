import { PrismaUsersRepository } from "../../../repositories/implementations/PrismaUsersRepository";
import { RemoveUserController } from "./RemoveUserController";
import { RemoveUserUseCase } from "./RemoveUserUseCase";

const prismaUsersRepository = new PrismaUsersRepository();

const removeUserUseCase = new RemoveUserUseCase(prismaUsersRepository);

const removeUserController = new RemoveUserController(removeUserUseCase);

export { removeUserController };
