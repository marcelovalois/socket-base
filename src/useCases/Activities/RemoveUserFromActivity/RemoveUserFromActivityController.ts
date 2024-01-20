import { Request, Response, NextFunction } from "express";
import { RemoveUserFromActivityUseCase } from "./RemoveUserFromActivityUseCase";
import { z } from "zod";

const removeUserFromActivitySchema = z.object({
  activity_id: z.number(),
  user_id: z.number(),
});

export class RemoveUserFromActivityController {
  constructor(private removeUserFromActivityUseCase: RemoveUserFromActivityUseCase) {}

  handle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { activity_id, user_id } = removeUserFromActivitySchema.parse(req.body);

      await this.removeUserFromActivityUseCase.execute({
        activity_id,
        user_id,
      });

      return res.status(204).json({ success: true });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ success: false, error });
      } else {
        next(error);
      }
    }
  };
}
