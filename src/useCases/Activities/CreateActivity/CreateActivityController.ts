import { Request, Response, NextFunction } from "express";
import { CreateActivityUseCase } from "./CreateActivityUseCase";
import { z } from "zod";

const createActivitySchema = z.object({
  title: z.string(),
  user_id: z.number(),
});

export class CreateActivityController {
  constructor(private createActivityUseCase: CreateActivityUseCase) {}

  handle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { title, user_id } = createActivitySchema.parse(req.body);

      const activityId = await this.createActivityUseCase.execute({ title, user_id });

      return res.status(200).json({ success: true, id: activityId });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.issues });
      } else {
        next(error);
      }
    }
  };
}
