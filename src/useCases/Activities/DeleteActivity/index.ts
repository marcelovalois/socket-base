import { PrismaActivitiesRepository } from "../../../repositories/implementations/PrismaActivitiesRepository";
import { DeleteActivityUseCase } from "./DeleteActivityUseCase";
import { DeleteActivityController } from "./DeleteActivityController";

const prismaActivitiesRepository = new PrismaActivitiesRepository();

const deleteActivityUseCase = new DeleteActivityUseCase(prismaActivitiesRepository);

const deleteActivityController = new DeleteActivityController(deleteActivityUseCase);

export { deleteActivityUseCase, deleteActivityController };
