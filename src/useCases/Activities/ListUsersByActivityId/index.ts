import { PrismaActivitiesRepository } from "../../../repositories/implementations/PrismaActivitiesRepository";
import { ListUsersByActivityIdController } from "./ListUsersByActivityIdController";
import { ListUsersByActivityIdUseCase } from "./ListUsersByActivityIdUseCase";

const prismaActivitiesRepository = new PrismaActivitiesRepository();

const listUsersByActivityIdUseCase = new ListUsersByActivityIdUseCase(prismaActivitiesRepository);

const listUsersByActivityIdController = new ListUsersByActivityIdController(listUsersByActivityIdUseCase);

export { listUsersByActivityIdUseCase, listUsersByActivityIdController };
