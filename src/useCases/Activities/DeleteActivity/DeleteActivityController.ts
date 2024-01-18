import { Request, Response, NextFunction } from "express";
import { DeleteActivityUseCase } from "./DeleteActivityUseCase";
import { z } from "zod";

const deleteActivitySchema = z.object({
  id: z.string(),
});

export class DeleteActivityController {
  constructor(private deleteActivityUseCase: DeleteActivityUseCase) {}

  handle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = deleteActivitySchema.parse(req.params);
      const parsedId = Number(id);

      await this.deleteActivityUseCase.execute({ id: parsedId });

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
