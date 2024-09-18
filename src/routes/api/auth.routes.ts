import { Router } from "express";

import { loginController } from "../../useCases/Auth/Login";
import { checkController } from "../../useCases/Auth/Check";

const authRoutes = Router();

authRoutes.post("/login", loginController.handle);
authRoutes.get("/check", checkController.handle);

export default authRoutes;
