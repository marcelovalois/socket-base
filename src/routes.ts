import { Router } from "express";

import { createUserController } from "./useCases/Users/CreateUser";
import { listUserController } from "./useCases/Users/ListUsers";
import { findUserByIdController } from "./useCases/Users/FindUserById";
import { removeUserController } from "./useCases/Users/RemoveUser";

const routes = Router();

routes.post("/create_user", createUserController.handle);
routes.get("/list_users", listUserController.handle);
routes.get("/find_user/:id", findUserByIdController.handle);
routes.delete("/remove_user/:id", removeUserController.handle);

export default routes;
