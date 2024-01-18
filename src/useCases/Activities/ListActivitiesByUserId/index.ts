import { PrismaActivitiesRepository } from "../../../repositories/implementations/PrismaActivitiesRepository";
import { ListActivitiesByUserIdUseCase } from "./ListActivitiesByUserIdUseCase";
import { ListActivitiesByUserIdController } from "./ListActivitiesByUserIdController";

const prismaActivitiesRepository = new PrismaActivitiesRepository();

const listActivitiesByUserIdUseCase = new ListActivitiesByUserIdUseCase(prismaActivitiesRepository);

const listActivitiesByUserIdController = new ListActivitiesByUserIdController(listActivitiesByUserIdUseCase);

export { listActivitiesByUserIdUseCase, listActivitiesByUserIdController };
