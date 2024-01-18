import { PrismaActivitiesRepository } from "../../../repositories/implementations/PrismaActivitiesRepository";
import { FindActivityByIdUseCase } from "./FindActivityByIdUseCase";
import { FindActivityByIdController } from "./FindActivityByIdController";

const prismaActivitiesRepository = new PrismaActivitiesRepository();

const findActivityByIdUseCase = new FindActivityByIdUseCase(prismaActivitiesRepository);

const findActivityByIdController = new FindActivityByIdController(findActivityByIdUseCase);

export { findActivityByIdUseCase, findActivityByIdController };
