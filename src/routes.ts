import { Router } from "express";

import UserController from "./controllers/UserController";
import { createUserController } from "./useCases/Users/CreateUser";
import { listUserController } from "./useCases/Users/ListUsers";

const routes = Router();
const userController = new UserController();

routes.post("/create_user", createUserController.handle);
routes.get("/list_users", listUserController.handle);
routes.get("/users", userController.list);
routes.post("/users", userController.insert);

export default routes;
