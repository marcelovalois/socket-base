import { PrismaUsersRepository } from "../../../repositories/implementations/PrismaUsersRepository";
import { ListUserActivitiesController } from "./ListUserActivitiesController";
import { ListUserActivitiesUseCase } from "./ListUserActivitiesUseCase";

const prismaUsersRepository = new PrismaUsersRepository();

const listUserActivitiesUseCase = new ListUserActivitiesUseCase(prismaUsersRepository);

const listUserActivitiesController = new ListUserActivitiesController(listUserActivitiesUseCase);

export { listUserActivitiesController, listUserActivitiesUseCase };
