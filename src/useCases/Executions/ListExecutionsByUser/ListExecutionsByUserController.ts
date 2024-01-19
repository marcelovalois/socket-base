import { Request, Response, NextFunction } from "express";
import { ListExecutionsByUserUseCase } from "./ListExecutionsByUserUseCase";
import { z } from "zod";

const listExecutionsByUserSchema = z.object({
  id: z.string().transform(Number),
});

export class ListExecutionsByUserController {
  constructor(private listExecutionsByUserUseCase: ListExecutionsByUserUseCase) {}

  handle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = listExecutionsByUserSchema.parse(req.params);

      const executions = await this.listExecutionsByUserUseCase.execute(id);

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
