import { PrismaUsersRepository } from "../../../repositories/implementations/PrismaUsersRepository";
import { FindUserByEmailController } from "./FindUserByEmailController";
import { FindUserByEmailUseCase } from "./FindUserByEmailUseCase";

const prismaUsersRepository = new PrismaUsersRepository();

const findUserByEmailUseCase = new FindUserByEmailUseCase(prismaUsersRepository);

const findUserByEmailController = new FindUserByEmailController(findUserByEmailUseCase);

export { findUserByEmailController, findUserByEmailUseCase };
