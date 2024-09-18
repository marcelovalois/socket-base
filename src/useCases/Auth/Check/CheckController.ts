import { NextFunction, Request, Response } from "express";

import { z } from "zod";
import { CheckUseCase } from "./CheckUseCase";

export class CheckController {
  constructor(private checkUseCase: CheckUseCase) {}

  handle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cookies = req.cookies;
      const pontuandoAuthToken: string = cookies["pontuandoAuthToken"] ?? "";

      const result = await this.checkUseCase.execute({ pontuandoAuthToken });

      if (!result) return res.status(200).json({ success: false, message: "Invalid or expired token" });

      return res.status(200).json({ success: true, message: "Token checked successfully", data: result });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(422).json({ success: false, message: "Error: Invalid data", error: error.issues });
      } else {
        next(error);
      }
    }
  };
}
