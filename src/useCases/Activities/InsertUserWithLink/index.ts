import { PrismaActivitiesRepository } from "../../../repositories/implementations/PrismaActivitiesRepository";
import { InsertUserWithLinkUseCase } from "./InsertUserWithLinkUseCase";
import { InsertUserWithLinkController } from "./InsertUserWithLinkController";

const prismaActivitiesRepository = new PrismaActivitiesRepository();

const insertUserWithLinkUseCase = new InsertUserWithLinkUseCase(prismaActivitiesRepository);

const insertUserWithLinkController = new InsertUserWithLinkController(insertUserWithLinkUseCase);

export { insertUserWithLinkUseCase, insertUserWithLinkController };
