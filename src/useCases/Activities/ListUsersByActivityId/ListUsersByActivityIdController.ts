import { Request, Response, NextFunction } from "express";
import { ListUsersByActivityIdUseCase } from "./ListUsersByActivityIdUseCase";
import { z } from "zod";

const listUsersByActivityIdSchema = z.object({
  id: z.string().transform(Number),
});

export class ListUsersByActivityIdController {
  constructor(private listUsersByActivityIdUseCase: ListUsersByActivityIdUseCase) {}

  handle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = listUsersByActivityIdSchema.parse(req.params);

      const activities = await this.listUsersByActivityIdUseCase.execute(id);

      return res.status(200).json({ success: true, data: activities });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ success: false, error });
      } else {
        next(error);
      }
    }
  };
}
