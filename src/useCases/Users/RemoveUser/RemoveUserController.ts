import { Request, Response, NextFunction } from "express";
import { RemoveUserUseCase } from "./RemoveUserUseCase";

import { z } from "zod";

const removeUserSchema = z.object({
  id: z.string().transform(Number),
});

export class RemoveUserController {
  constructor(private removeUserUseCase: RemoveUserUseCase) {}

  handle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = removeUserSchema.parse(req.params);

      const userData = await this.removeUserUseCase.execute(id);

      return res.status(200).json({ success: true, message: "User removed successfully", data: { id: userData.id } });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(422).json({ success: false, message: "Error: Invalid data", error: error.issues });
      } else {
        next(error);
      }
    }
  };
}
