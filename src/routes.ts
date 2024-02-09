import { Router } from "express";

import { createUserController } from "./useCases/Users/CreateUser";
import { listUserController } from "./useCases/Users/ListUsers";
import { findUserByIdController } from "./useCases/Users/FindUserById";
import { findUserByEmailController } from "./useCases/Users/FindUserByEmail";
import { removeUserController } from "./useCases/Users/RemoveUser";
import { listUserActivitiesController } from "./useCases/Users/ListUserActivities";
import { updateUserController } from "./useCases/Users/UpdateUser";

import { sendExecutionController } from "./useCases/Executions/SendExecution";
import { listExecutionsByUserController } from "./useCases/Executions/ListExecutionsByUser";
import { listExecutionsByActivityController } from "./useCases/Executions/ListExecutionsByActivity";

import { createActivityController } from "./useCases/Activities/CreateActivity";
import { listActivitiesController } from "./useCases/Activities/ListActivities";
import { findActivityByIdController } from "./useCases/Activities/FindActivityById";
import { listActivitiesByCreatorIdController } from "./useCases/Activities/ListActivitiesByCreatorId";
import { deleteActivityController } from "./useCases/Activities/DeleteActivity";
import { updateActivityController } from "./useCases/Activities/UpdateActivity";
import { listUsersByActivityIdController } from "./useCases/Activities/ListUsersByActivityId";
import { insertUserToActivityController } from "./useCases/Activities/InsertUserToActivity";
import { removeUserFromActivityController } from "./useCases/Activities/RemoveUserFromActivity";
import { insertUserWithLinkController } from "./useCases/Activities/InsertUserWithLink";

import { loginController } from "./useCases/Auth/Login";
import { authTokenController } from "./useCases/Auth/AuthToken";

const routes = Router();

routes.get("/list_users", listUserController.handle);
routes.get("/find_user/:id", findUserByIdController.handle);
routes.get("/list_user_activities/:id", listUserActivitiesController.handle);
routes.put("/update_user/:id", updateUserController.handle);
routes.post("/find_user_by_email", findUserByEmailController.handle);
routes.post("/create_user", createUserController.handle);
routes.delete("/remove_user/:id", removeUserController.handle);

routes.get("/list_messages_by_user/:id", listExecutionsByUserController.handle);
routes.get("/list_messages_by_activity/:id", listExecutionsByActivityController.handle);
routes.post("/send_message", sendExecutionController.handle);

routes.get("/list_activities", listActivitiesController.handle);
routes.get("/list_activities_by_user/:id", listActivitiesByCreatorIdController.handle);
routes.get("/find_activity/:id", findActivityByIdController.handle);
routes.get("/list_activity_users/:id", listUsersByActivityIdController.handle);
routes.put("/update_activity/:id", updateActivityController.handle);
routes.post("/create_activity", createActivityController.handle);
routes.post("/insert_user_to_activity", insertUserToActivityController.handle);
routes.post("/join_with_link", insertUserWithLinkController.handle);
routes.delete("/delete_activity/:id", deleteActivityController.handle);
routes.delete("/remove_user_from_activity", removeUserFromActivityController.handle);

routes.get("/auth", authTokenController.handle);
routes.post("/login", loginController.handle);

export default routes;
