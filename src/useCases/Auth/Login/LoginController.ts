import { NextFunction, Request, Response } from "express";

import { z } from "zod";
import { LoginUseCase } from "./LoginUseCase";

//Write your schema variable name below
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export class LoginController {
  constructor(private loginUseCase: LoginUseCase) {}

  handle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = loginSchema.parse(req.body);

      const token = await this.loginUseCase.execute({ email, password });

      if (!token) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      return res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  };
}
