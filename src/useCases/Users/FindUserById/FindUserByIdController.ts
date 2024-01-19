import { Request, Response, NextFunction } from "express";
import { FindUserByIdUseCase } from "./FindUserByIdUseCase";

import { z } from "zod";

const findUserByIdSchema = z.object({
  id: z.string(),
});

export class FindUserByIdController {
  constructor(private findUserByIdUseCase: FindUserByIdUseCase) {}

  handle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = findUserByIdSchema.parse(req.params);
      const parsedId = Number(id);

      const user = await this.findUserByIdUseCase.execute({ id: parsedId });

      return res.status(200).json({ success: true, user });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.issues });
      } else {
        next(error);
      }
    }
  };
}