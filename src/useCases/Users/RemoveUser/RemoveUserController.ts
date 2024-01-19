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

      return res.status(200).json({ success: true, id: userData.id });
    } catch (error) {
      next(error);
    }
  };
}
