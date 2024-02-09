import { AuthTokenController } from "./AuthTokenController";
import { AuthTokenUseCase } from "./AuthTokenUseCase";
import { PrismaUsersRepository } from "../../../repositories/implementations/PrismaUsersRepository";

const usersRepository = new PrismaUsersRepository();

const authTokenUseCase = new AuthTokenUseCase(usersRepository);

const authTokenController = new AuthTokenController(authTokenUseCase);

export { authTokenUseCase, authTokenController };
