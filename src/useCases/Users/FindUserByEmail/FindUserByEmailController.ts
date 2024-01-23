import { Request, Response, NextFunction } from "express";
import { FindUserByEmailUseCase } from "./FindUserByEmailUseCase";
import { z } from "zod";

const findUserByEmailSchema = z.object({
  email: z.string().email(),
});

export class FindUserByEmailController {
  constructor(private findUserByEmailUseCase: FindUserByEmailUseCase) {}

  handle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = findUserByEmailSchema.parse(req.body);

      const user = await this.findUserByEmailUseCase.execute(email);

      return res.status(200).json({ success: true, user });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.issues });
      } else {
        next(error);
      }
    }
  };
}
