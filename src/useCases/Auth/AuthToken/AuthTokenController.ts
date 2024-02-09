import { NextFunction, Request, Response } from "express";
import { AuthTokenUseCase } from "./AuthTokenUseCase";
import { z } from "zod";

const authTokenSchema = z.object({
  pontuandoAuthToken: z.string(),
});

export class AuthTokenController {
  constructor(private authTokenUseCase: AuthTokenUseCase) {}

  handle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { pontuandoAuthToken } = authTokenSchema.parse(req.cookies);

      const userData = await this.authTokenUseCase.execute({ token: pontuandoAuthToken });

      if (userData == null) return res.sendStatus(401);

      return res
        .status(200)
        .cookie("pontuandoAuthToken", userData.token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          maxAge: 1000 * 60 * 60 * 24 * 30,
        })
        .json({
          success: true,
          id: userData.id,
          name: userData.name,
          email: userData.email,
          image: userData.image,
          type: userData.type,
        });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.issues });
      } else {
        next(error);
      }
    }
  };
}
