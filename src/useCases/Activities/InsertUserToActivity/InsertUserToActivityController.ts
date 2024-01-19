import { Request, Response, NextFunction } from "express";
import { InsertUserToActivityUseCase } from "./InsertUserToActivityUseCase";
import { z } from "zod";

const insertUserToActivitySchema = z.object({
  activity_id: z.number(),
  user_id: z.number(),
});

export class InsertUserToActivityController {
  constructor(private insertUserToActivityUseCase: InsertUserToActivityUseCase) {}

  handle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { activity_id, user_id } = insertUserToActivitySchema.parse(req.body);

      await this.insertUserToActivityUseCase.execute({
        activity_id,
        user_id,
      });

      return res.status(200).json({ success: true });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ success: false, error });
      } else {
        next(error);
      }
    }
  };
}
