import { Request, Response, NextFunction } from "express";
import { ListActivitiesByUserIdUseCase } from "./ListActivitiesByUserIdUseCase";
import { z } from "zod";

const listActivitiesByUserIdSchema = z.object({
  id: z.string(),
});

export class ListActivitiesByUserIdController {
  constructor(private listActivitiesByUserIdUseCase: ListActivitiesByUserIdUseCase) {}

  handle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = listActivitiesByUserIdSchema.parse(req.params);
      const parsedId = Number(id);

      const activities = await this.listActivitiesByUserIdUseCase.execute({ user_id: parsedId });

      return res.status(200).json({ success: true, activities });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.issues });
      } else {
        next(error);
      }
    }
  };
}
