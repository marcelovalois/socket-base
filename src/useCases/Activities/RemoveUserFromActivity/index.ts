import { PrismaActivitiesRepository } from "../../../repositories/implementations/PrismaActivitiesRepository";
import { RemoveUserFromActivityUseCase } from "./RemoveUserFromActivityUseCase";
import { RemoveUserFromActivityController } from "./RemoveUserFromActivityController";

const prismaActivitiesRepository = new PrismaActivitiesRepository();

const removeUserFromActivityUseCase = new RemoveUserFromActivityUseCase(prismaActivitiesRepository);

const removeUserFromActivityController = new RemoveUserFromActivityController(removeUserFromActivityUseCase);

export { removeUserFromActivityUseCase, removeUserFromActivityController };
