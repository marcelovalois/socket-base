import { PrismaActivitiesRepository } from "../../../repositories/implementations/PrismaActivitiesRepository";
import { InsertUserToActivityUseCase } from "./InsertUserToActivityUseCase";
import { InsertUserToActivityController } from "./InsertUserToActivityController";

const prismaActivitiesRepository = new PrismaActivitiesRepository();

const insertUserToActivityUseCase = new InsertUserToActivityUseCase(prismaActivitiesRepository);

const insertUserToActivityController = new InsertUserToActivityController(insertUserToActivityUseCase);

export { insertUserToActivityUseCase, insertUserToActivityController };
