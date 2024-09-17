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

      if (!users) {
        return res.status(404).json({ success: false, message: "No users found", data: [] });
      }

      return res.status(200).json({ success: true, message: "Users found successfully", data: users });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(422).json({ success: false, message: "Error: Invalid data", error: error.issues });
      } else {
        next(error);
      }
    }
  };
}
