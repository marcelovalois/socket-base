import { Request, Response, NextFunction } from "express";
import { RemoveUserUseCase } from "./RemoveUserUseCase";

import { z } from "zod";

const removeUserSchema = z.object({
  id: z.string(),
});

export class RemoveUserController {
  constructor(private removeUserUseCase: RemoveUserUseCase) {}

  handle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = removeUserSchema.parse(req.params);
      const parsedId = Number(id);

      const userData = await this.removeUserUseCase.execute(parsedId);

      return res.status(200).json({ success: true, id: userData.id });
    } catch (error) {
      next(error);
    }
  };
}
