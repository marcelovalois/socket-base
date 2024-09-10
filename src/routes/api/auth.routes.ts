import { Router } from "express";

import { loginController } from "../../useCases/Auth/Login";

const authRoutes = Router();

authRoutes.post("/login", loginController.handle);

export default authRoutes;
