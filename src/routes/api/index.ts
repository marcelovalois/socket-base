import { Router } from "express";

import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import { authenticateJWT } from "../../middlewares/authMiddleware";
import activityRoutes from "./activity.routes";

const routes = Router();

routes.use("/auth", authRoutes);

// Rotas abaixo precisam de autenticação
routes.use(authenticateJWT); // Middleware de autenticação

routes.use("/user", userRoutes);
routes.use("/activity", activityRoutes);

export default routes;
