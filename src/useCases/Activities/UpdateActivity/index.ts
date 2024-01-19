import { PrismaActivitiesRepository } from "../../../repositories/implementations/PrismaActivitiesRepository";
import { UpdateActivityController } from "./UpdateActivityController";
import { UpdateActivityUseCase } from "./UpdateActivityUseCase";

const prismaActivitiesRepository = new PrismaActivitiesRepository();

const updateActivityUseCase = new UpdateActivityUseCase(prismaActivitiesRepository);

const updateActivityController = new UpdateActivityController(updateActivityUseCase);

export { updateActivityController, updateActivityUseCase };
