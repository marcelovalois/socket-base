import { Request, Response, NextFunction } from "express";
import { SendExecutionUseCase } from "./SendExecutionUseCase";

import { z } from "zod";

const sendExecutionSchema = z.object({
  username: z.string(),
  image: z.string(),
  type: z.string(),
});

export class SendExecutionController {
  constructor(private sendExecutionUseCase: SendExecutionUseCase) {}

  handle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, image, type } = sendExecutionSchema.parse(req.body);

      const userData = await this.sendExecutionUseCase.execute({
        name: username,
        image,
        type,
      });

      return res.status(200).json({ success: true, id: userData.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.issues });
      } else {
        next(error);
      }
    }
  };
}
