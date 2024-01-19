import { Request, Response, NextFunction } from "express";
import { FindActivityByIdUseCase } from "./FindActivityByIdUseCase";
import { z } from "zod";

const findActivityByIdSchema = z.object({
  id: z.string().transform(Number),
});

export class FindActivityByIdController {
  constructor(private findActivityByIdUseCase: FindActivityByIdUseCase) {}

  handle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = findActivityByIdSchema.parse(req.params);

      const activity = await this.findActivityByIdUseCase.execute(id);

      return res.status(200).json({ success: true, activity });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.issues });
      } else {
        next(error);
      }
    }
  };
}
