import { Request, Response, NextFunction } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";

import { z } from "zod";

const createUserSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  image: z.string(),
  type: z.string(),
});

export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  handle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, email, image, type } = createUserSchema.parse(req.body);

      const userData = await this.createUserUseCase.execute({
        name: username,
        email,
        image,
        type,
      });

      return res.status(201).json({ success: true, id: userData.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.issues });
      } else {
        next(error);
      }
    }
  };
}
