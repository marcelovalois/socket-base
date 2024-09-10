import { Router } from "express";

import { listUserController } from "../../useCases/Users/ListUsers";
import { findUserByIdController } from "../../useCases/Users/FindUserById";
import { createUserController } from "../../useCases/Users/CreateUser";
import { findUserByEmailController } from "../../useCases/Users/FindUserByEmail";
import { updateUserController } from "../../useCases/Users/UpdateUser";
import { removeUserController } from "../../useCases/Users/RemoveUser";

const userRoutes = Router();

userRoutes.post("/create", createUserController.handle);
userRoutes.get("/list", listUserController.handle);
userRoutes.get("/find/:id", findUserByIdController.handle);
userRoutes.get("/find_by_email", findUserByEmailController.handle);
userRoutes.put("/update/:id", updateUserController.handle);
userRoutes.delete("/delete/:id", removeUserController.handle);

export default userRoutes;
