import { Router } from "express";

import UserController from "../controllers/UserController";

const routes = Router();
const userController = new UserController();

routes.get("/users", userController.list);
routes.post("/users", userController.insert);

export default routes;
