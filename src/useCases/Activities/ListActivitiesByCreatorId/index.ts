import { PrismaActivitiesRepository } from "../../../repositories/implementations/PrismaActivitiesRepository";
import { ListActivitiesByCreatorIdUseCase } from "./ListActivitiesByCreatorIdUseCase";
import { ListActivitiesByCreatorIdController } from "./ListActivitiesByCreatorIdController";

const prismaActivitiesRepository = new PrismaActivitiesRepository();

const listActivitiesByCreatorIdUseCase = new ListActivitiesByCreatorIdUseCase(prismaActivitiesRepository);

const listActivitiesByCreatorIdController = new ListActivitiesByCreatorIdController(listActivitiesByCreatorIdUseCase);

export { listActivitiesByCreatorIdUseCase, listActivitiesByCreatorIdController };
