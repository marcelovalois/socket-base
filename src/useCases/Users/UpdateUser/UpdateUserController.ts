import { Request, Response, NextFunction } from "express";
import { UpdateUserUseCase } from "./UpdateUserUseCase";
import { z } from "zod";

const updateUserSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  image: z.string().optional(),
  type: z.string().optional(),
});

const userIdSchema = z.object({
  id: z.string().transform(Number),
});

export class UpdateUserController {
  constructor(private updateUserUseCase: UpdateUserUseCase) {}

  handle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = userIdSchema.parse(req.params);
      const { name, email, image, type } = updateUserSchema.parse(req.body);

      await this.updateUserUseCase.execute({
        id,
        name,
        email,
        image,
        type,
      });

      return res.status(204).send();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.issues });
      } else {
        next(error);
      }
    }
  };
}
