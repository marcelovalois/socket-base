import { NextFunction, Request, Response } from "express";

import { FindActivityBySlugUseCase } from "./FindActivityBySlugUseCase";
import { z } from "zod";

//Write your schema variable name below
const findActivityBySlugSchema = z.object({
  slug: z.string(),
});

export class FindActivityBySlugController {
  constructor(private findActivityBySlugUseCase: FindActivityBySlugUseCase) {}

  handle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { slug } = findActivityBySlugSchema.parse(req.params);

      const activity = await this.findActivityBySlugUseCase.execute({ slug });

      if (!activity) {
        return res.status(404).json({ success: false, message: "Activity not found", data: {} });
      }

      return res.status(200).json({ success: true, message: "Activity successfully found", data: activity });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(422).json({ success: false, message: "Error: Invalid data", error: error.issues });
      } else {
        next(error);
      }
    }
  };
}
