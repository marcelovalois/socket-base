import { Request, Response, NextFunction } from "express";
import { ListActivitiesByCreatorIdUseCase } from "./ListActivitiesByCreatorIdUseCase";
import { z } from "zod";

const listActivitiesByCreatorIdSchema = z.object({
  id: z.string().transform(Number),
});

export class ListActivitiesByCreatorIdController {
  constructor(private listActivitiesByUserIdUseCase: ListActivitiesByCreatorIdUseCase) {}

  handle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = listActivitiesByCreatorIdSchema.parse(req.params);

      const activities = await this.listActivitiesByUserIdUseCase.execute(id);

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
