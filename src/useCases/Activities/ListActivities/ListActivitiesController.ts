import { Request, Response, NextFunction } from "express";
import { ListActivitiesUseCase } from "./ListActivitiesUseCase";
import { z } from "zod";

export class ListActivitiesController {
  constructor(private listActivitiesUseCase: ListActivitiesUseCase) {}

  handle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const activities = await this.listActivitiesUseCase.execute();

      if (!activities) {
        return res.status(404).json({ success: false, message: "No activities found", data: [] });
      }

      return res.status(200).json({ success: true, message: "Activities found successfully", data: activities });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(422).json({ success: false, message: "Error: Invalid data", error: error.issues });
      } else {
        next(error);
      }
    }
  };
}
