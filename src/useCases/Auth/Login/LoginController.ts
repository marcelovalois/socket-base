import { NextFunction, Request, Response } from "express";

import { z } from "zod";
import { LoginUseCase } from "./LoginUseCase";

//Write your schema variable name below
const loginSchema = z.object({
  email: z.string().email(),
});

export class LoginController {
  constructor(private loginUseCase: LoginUseCase) {}

  handle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = loginSchema.parse(req.body);

      const result = await this.loginUseCase.execute({ email });

      if (result == null) return res.sendStatus(401);

      return res
        .status(200)
        .cookie("pontuandoAuthToken", result.token, {
          httpOnly: true,
          // secure: true,
          sameSite: "none",
          maxAge: 1000 * 60 * 60 * 24 * 1,
        })
        .json({
          success: true,
          data: {
            id: result.id,
            name: result.name,
            email: result.email,
            image: result.image,
            type: result.type,
          },
        });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ success: false, error: error.issues });
      } else {
        next(error);
      }
    }
  };
}
