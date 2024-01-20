import { Request, Response, NextFunction } from "express";
import { UpdateActivityUseCase } from "./UpdateActivityUseCase";
import { Phrase } from "../../../entities/Phrase";
import { z } from "zod";

const updateActivitySchema = z.object({
  title: z.string().optional(),
  phrases: z
    .object({
      text: z.string(),
      order: z.number(),
    })
    .array()
    .optional(),
});

const updateActivityParamsSchema = z.object({
  id: z.string().transform(Number),
});

export class UpdateActivityController {
  constructor(private updateActivityUseCase: UpdateActivityUseCase) {}

  handle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = updateActivityParamsSchema.parse(req.params);
      const { title, phrases } = updateActivitySchema.parse(req.body);

      if (!title && !phrases) {
        throw new Error("You must provide at least one field to update");
      }

      let parsedPhrases: Phrase[] = [];
      if (phrases) {
        parsedPhrases = phrases.map((phrase) => ({
          ...phrase,
          activity_id: Number(id),
        }));
      }

      await this.updateActivityUseCase.execute({
        id,
        title,
        phrases: parsedPhrases,
      });

      return res.status(204).json({ success: true });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.issues });
      } else {
        next(error);
      }
    }
  };
}
