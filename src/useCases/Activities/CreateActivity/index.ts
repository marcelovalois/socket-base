import { PrismaActivitiesRepository } from "../../../repositories/implementations/PrismaActivitiesRepository";
import { CreateActivityController } from "./CreateActivityController";
import { CreateActivityUseCase } from "./CreateActivityUseCase";

const prismaActivitiesRepository = new PrismaActivitiesRepository();

const createActivityUseCase = new CreateActivityUseCase(prismaActivitiesRepository);

const createActivityController = new CreateActivityController(createActivityUseCase);

export { createActivityUseCase, createActivityController };
