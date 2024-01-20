import { Request, Response, NextFunction } from "express";
import { InsertUserWithLinkUseCase } from "./InsertUserWithLinkUseCase";
import { z } from "zod";

const InsertUserWithLinkSchema = z.object({
  user_id: z.number(),
  link: z.string(),
});

export class InsertUserWithLinkController {
  constructor(private insertUserWithLinkUseCase: InsertUserWithLinkUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { user_id, link } = InsertUserWithLinkSchema.parse(req.body);

      await this.insertUserWithLinkUseCase.execute({ user_id, link });

      return res.status(201).json({ success: true });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.issues });
      } else {
        next(error);
      }
    }
  }
}
