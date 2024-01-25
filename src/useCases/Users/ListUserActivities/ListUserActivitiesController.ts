import { Request, Response, NextFunction } from "express";
import { ListUserActivitiesUseCase } from "./ListUserActivitiesUseCase";
import { z } from "zod";

const listActivitiesByUserSchema = z.object({
  id: z.string().transform(Number),
});

export class ListUserActivitiesController {
  constructor(private listUserActivitiesUseCase: ListUserActivitiesUseCase) {}

  handle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = listActivitiesByUserSchema.parse(req.params);

      const activities = await this.listUserActivitiesUseCase.execute(id);

      return res.status(200).json({ success: true, activities: activities });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ success: false, error });
      } else {
        next(error);
      }
    }
  };
}
