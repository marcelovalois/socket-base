import { Request, Response, NextFunction } from "express";
import { ListActivitiesUseCase } from "./ListActivitiesUseCase";

export class ListActivitiesController {
  constructor(private listActivitiesUseCase: ListActivitiesUseCase) {}

  handle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const activities = await this.listActivitiesUseCase.execute();

      return res.status(200).json({ success: true, activities });
    } catch (error) {
      next(error);
    }
  };
}
