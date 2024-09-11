import { Request, Response, NextFunction } from "express";
import { ListUserUseCase } from "./ListUserUseCase";

import { z } from "zod";

const listUserSchema = z.object({});

export class ListUserController {
  constructor(private listUserUseCase: ListUserUseCase) {}

  handle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      listUserSchema.parse(req.body);

      const users = await this.listUserUseCase.execute();

      return res.status(200).json(users);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ success: false, error: error.issues });
      } else {
        next(error);
      }
    }
  };
}
