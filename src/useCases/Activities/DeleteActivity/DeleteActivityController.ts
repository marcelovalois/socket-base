import { Request, Response, NextFunction } from "express";
import { DeleteActivityUseCase } from "./DeleteActivityUseCase";
import { z } from "zod";

const deleteActivitySchema = z.object({
  id: z.string().transform(Number),
});

export class DeleteActivityController {
  constructor(private deleteActivityUseCase: DeleteActivityUseCase) {}

  handle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = deleteActivitySchema.parse(req.params);

      await this.deleteActivityUseCase.execute(id);

      return res.status(200).json({ success: true });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.issues });
      } else {
        next(error);
      }
    }
  };
}
