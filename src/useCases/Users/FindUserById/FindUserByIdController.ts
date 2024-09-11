import { Request, Response, NextFunction } from "express";
import { FindUserByIdUseCase } from "./FindUserByIdUseCase";

import { z } from "zod";

const findUserByIdSchema = z.object({
  id: z.string().transform(Number),
});

export class FindUserByIdController {
  constructor(private findUserByIdUseCase: FindUserByIdUseCase) {}

  handle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = findUserByIdSchema.parse(req.params);

      const user = await this.findUserByIdUseCase.execute({ id });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      return res.status(200).json({ success: true, data: user });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ success: false, error: error.issues });
      } else {
        next(error);
      }
    }
  };
}
