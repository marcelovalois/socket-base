import { PrismaActivitiesRepository } from "../../../repositories/implementations/PrismaActivitiesRepository";
import { FindActivityBySlugController } from "./FindActivityBySlugController";
import { FindActivityBySlugUseCase } from "./FindActivityBySlugUseCase";

const prismaActivitiesRepository = new PrismaActivitiesRepository();

const findActivityBySlugUseCase = new FindActivityBySlugUseCase(prismaActivitiesRepository);

const findActivityBySlugController = new FindActivityBySlugController(findActivityBySlugUseCase);

export { findActivityBySlugController };
