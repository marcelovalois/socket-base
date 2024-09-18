import { CheckController } from "./CheckController";
import { CheckUseCase } from "./CheckUseCase";

const checkUseCase = new CheckUseCase();

const checkController = new CheckController(checkUseCase);

export { checkController };
