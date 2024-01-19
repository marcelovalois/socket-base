import { Router } from "express";

import { createUserController } from "./useCases/Users/CreateUser";
import { listUserController } from "./useCases/Users/ListUsers";
import { findUserByIdController } from "./useCases/Users/FindUserById";
import { removeUserController } from "./useCases/Users/RemoveUser";

import { sendExecutionController } from "./useCases/Executions/SendExecution";
import { listExecutionsByUserController } from "./useCases/Executions/ListExecutionsByUser";
import { listExecutionsByActivityController } from "./useCases/Executions/ListExecutionsByActivity";

import { createActivityController } from "./useCases/Activities/CreateActivity";
import { listActivitiesController } from "./useCases/Activities/ListActivities";
import { findActivityByIdController } from "./useCases/Activities/FindActivityById";
import { listActivitiesByUserIdController } from "./useCases/Activities/ListActivitiesByUserId";
import { deleteActivityController } from "./useCases/Activities/DeleteActivity";
import { updateActivityController } from "./useCases/Activities/UpdateActivity";

const routes = Router();

routes.post("/create_user", createUserController.handle);
routes.get("/list_users", listUserController.handle);
routes.get("/find_user/:id", findUserByIdController.handle);
routes.delete("/remove_user/:id", removeUserController.handle);

routes.post("/send_message", sendExecutionController.handle);
routes.get("/list_messages_by_user/:id", listExecutionsByUserController.handle);
routes.get("/list_messages_by_activity/:id", listExecutionsByActivityController.handle);

routes.post("/create_activity", createActivityController.handle);
routes.get("/list_activities", listActivitiesController.handle);
routes.get("/list_activities_by_user/:id", listActivitiesByUserIdController.handle);
routes.get("/find_activity/:id", findActivityByIdController.handle);
routes.delete("/delete_activity/:id", deleteActivityController.handle);
routes.put("/update_activity/:id", updateActivityController.handle);

export default routes;
