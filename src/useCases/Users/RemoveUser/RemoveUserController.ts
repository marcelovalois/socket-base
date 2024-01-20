import { Request, Response, NextFunction } from "express";
import { RemoveUserUseCase } from "./RemoveUserUseCase";

import { z } from "zod";

const removeUserSchema = z.object({
  id: z.string().transform(Number),
});

export class RemoveUserController {
  constructor(private removeUserUseCase: RemoveUserUseCase) {}

  handle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = removeUserSchema.parse(req.params);

      const userData = await this.removeUserUseCase.execute(id);

      return res.status(204).json({ success: true, id: userData.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.issues });
      } else {
        next(error);
      }
    }
  };
}
