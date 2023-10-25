import { Request, Response, NextFunction } from "express";
import { ListUserUseCase } from "./ListUserUseCase";

export class ListUserController {
  constructor(private listUserUseCase: ListUserUseCase) {}

  handle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await this.listUserUseCase.execute();

      return res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  };
}
