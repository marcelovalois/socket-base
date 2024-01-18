import { PrismaExecutionsRepository } from "../../../repositories/implementations/PrismaExecutionsRepository";
import { ListExecutionsByActivityController } from "./ListExecutionsByActivityController";
import { ListExecutionsByActivityUseCase } from "./ListExecutionsByActivityUseCase";

const prismaExecutionsRepository = new PrismaExecutionsRepository();

const listExecutionsByActivityUseCase = new ListExecutionsByActivityUseCase(prismaExecutionsRepository);

const listExecutionsByActivityController = new ListExecutionsByActivityController(listExecutionsByActivityUseCase);

export { listExecutionsByActivityUseCase, listExecutionsByActivityController };
