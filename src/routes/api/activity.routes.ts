import { Router } from "express";
import { createActivityController } from "../../useCases/Activities/CreateActivity";
import { listActivitiesController } from "../../useCases/Activities/ListActivities";
import { findActivityByIdController } from "../../useCases/Activities/FindActivityById";

const activityRoutes = Router();

activityRoutes.post("/create", createActivityController.handle);
activityRoutes.get("/list", listActivitiesController.handle);
activityRoutes.get("/find/:id", findActivityByIdController.handle);

export default activityRoutes;
