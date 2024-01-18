import { PrismaExecutionsRepository } from "../../../repositories/implementations/PrismaExecutionsRepository";
import { ListExecutionsByUserUseCase } from "./ListExecutionsByUserUseCase";
import { ListExecutionsByUserController } from "./ListExecutionsByUserController";

const prismaExecutionsRepository = new PrismaExecutionsRepository();

const listExecutionsByUserUseCase = new ListExecutionsByUserUseCase(prismaExecutionsRepository);

const listExecutionsByUserController = new ListExecutionsByUserController(listExecutionsByUserUseCase);

export { listExecutionsByUserUseCase, listExecutionsByUserController };
