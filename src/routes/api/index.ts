import { Router } from "express";

import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import { authenticateJWT } from "../../middlewares/authMiddleware";

const routes = Router();

routes.use("/auth", authRoutes);

// Rotas abaixo precisam de autenticação
routes.use(authenticateJWT);

routes.use("/user", userRoutes);

export default routes;
