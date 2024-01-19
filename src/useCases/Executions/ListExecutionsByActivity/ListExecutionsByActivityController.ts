import { Request, Response, NextFunction } from "express";
import { ListExecutionsByActivityUseCase } from "./ListExecutionsByActivityUseCase";
import { z } from "zod";

const listExecutionsByActivitySchema = z.object({
  id: z.string().transform(Number),
});

export class ListExecutionsByActivityController {
  constructor(private listExecutionsByActivityUseCase: ListExecutionsByActivityUseCase) {}

  handle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = listExecutionsByActivitySchema.parse(req.params);

      const executions = await this.listExecutionsByActivityUseCase.execute(id);

      return res.status(200).json({ success: true, executions });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.issues });
      } else {
        next(error);
      }
    }
  };
}
