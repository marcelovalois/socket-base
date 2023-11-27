import { Request, Response, NextFunction } from "express";
import { FindUserByIdUseCase } from "./FindUserByIdUseCase";

export class FindUserByIdController {
  constructor(private findUserByIdUseCase: FindUserByIdUseCase) {}

  handle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: number = Number(req.params.id);

      const user = await this.findUserByIdUseCase.execute({ id });

      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };
}
