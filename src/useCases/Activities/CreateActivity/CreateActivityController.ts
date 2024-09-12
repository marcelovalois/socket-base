import { Request, Response, NextFunction } from "express";
import { CreateActivityUseCase } from "./CreateActivityUseCase";
import { z } from "zod";

const createActivitySchema = z.object({
  title: z.string(),
  user_id: z.number(),
  phrases: z
    .object({
      text: z.string(),
      order: z.number(),
    })
    .array()
    .optional(),
});

export class CreateActivityController {
  constructor(private createActivityUseCase: CreateActivityUseCase) {}

  handle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { title, user_id, phrases } = createActivitySchema.parse(req.body);

      const activity = await this.createActivityUseCase.execute({ title, user_id, phrases });

      return res.status(201).json({ success: true, message: "Activity created successfully", data: activity });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(422).json({ success: false, message: "Error: Invalid data", error: error.issues });
      } else {
        next(error);
      }
    }
  };
}
