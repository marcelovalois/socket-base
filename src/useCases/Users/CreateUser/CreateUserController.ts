import { Request, Response, NextFunction } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";

import { z } from "zod";

const createUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  image: z.string(),
  type: z.string(),
});

export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  handle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, image, type } = createUserSchema.parse(req.body);

      const userData = await this.createUserUseCase.execute({
        name,
        email,
        image,
        type,
      });

      res.cookie("pontuandoAuthToken", userData.token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 * 30,
      });
      res.status(201).json({
        success: true,
        id: userData.id,
        name: userData.name,
        email: userData.email,
        image: userData.image,
        type: userData.type,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.issues });
      } else {
        next(error);
      }
    }
  };
}
