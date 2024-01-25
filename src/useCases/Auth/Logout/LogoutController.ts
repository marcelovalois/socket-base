import { NextFunction, Request, Response } from "express";
import { LogoutUseCase } from "./LogoutUseCase";
import { z } from "zod";

const logoutSchema = z.object({});

export class LogoutController {
  constructor(private logoutUseCase: LogoutUseCase) {}

  handle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = logoutSchema.parse(req.body);

      console.log(body);

      return res.status(200).send("OK");
    } catch (error) {
      next(error);
    }
  };
}
