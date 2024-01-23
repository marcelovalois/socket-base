import { PrismaUsersRepository } from "../../../repositories/implementations/PrismaUsersRepository";
import { LoginController } from "./LoginController";
import { LoginUseCase } from "./LoginUseCase";

const usersRepository = new PrismaUsersRepository();

const loginUseCase = new LoginUseCase(usersRepository);

const loginController = new LoginController(loginUseCase);

export { loginController };
