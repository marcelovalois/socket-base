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
      const { email } = findUserByEmailSchema.parse(req.query);

      const user = await this.findUserByEmailUseCase.execute({ email });

      if (!user) {
        return res.status(404).json({ success: false, message: "User not found", data: {} });
      }

      return res.status(200).json({ success: true, message: "User found successfully", data: user });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(422).json({ success: false, message: "Error: Invalid data", error: error.issues });
      } else {
        next(error);
      }
    }
  };
}
