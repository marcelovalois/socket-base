import { PrismaExecutionsRepository } from "../../../repositories/implementations/PrismaExecutionsRepository";
import { SendExecutionUseCase } from "./SendExecutionUseCase";
import { SendExecutionController } from "./SendExecutionController";

const prismaExecutionsRepository = new PrismaExecutionsRepository();

const sendExecutionUseCase = new SendExecutionUseCase(prismaExecutionsRepository);

const sendExecutionController = new SendExecutionController(sendExecutionUseCase);

export { sendExecutionUseCase, sendExecutionController };
