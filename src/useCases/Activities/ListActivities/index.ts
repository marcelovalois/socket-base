import { ListActivitiesController } from "./ListActivitiesController";
import { ListActivitiesUseCase } from "./ListActivitiesUseCase";
import { PrismaActivitiesRepository } from "../../../repositories/implementations/PrismaActivitiesRepository";

const prismaActivitiesRepository = new PrismaActivitiesRepository();

const listActivitiesUseCase = new ListActivitiesUseCase(prismaActivitiesRepository);

const listActivitiesController = new ListActivitiesController(listActivitiesUseCase);

export { listActivitiesUseCase, listActivitiesController };
