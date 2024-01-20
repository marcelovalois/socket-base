import { Request, Response, NextFunction } from "express";
import { SendExecutionUseCase } from "./SendExecutionUseCase";

import { z } from "zod";

const sendExecutionSchema = z.object({
  user_id: z.number(),
  activity_id: z.number(),
  message: z.string(),
  pontuando_quote: z.boolean(),
});

export class SendExecutionController {
  constructor(private sendExecutionUseCase: SendExecutionUseCase) {}

  handle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user_id, activity_id, message, pontuando_quote } = sendExecutionSchema.parse(req.body);

      const messageData = await this.sendExecutionUseCase.execute({ user_id, message, activity_id, pontuando_quote });

      return res.status(201).json({ success: true, id: messageData });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.issues });
      } else {
        next(error);
      }
    }
  };
}
