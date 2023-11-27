import { Request, Response, NextFunction } from "express";
import { RemoveUserUseCase } from "./RemoveUserUseCase";

export class RemoveUserController {
  constructor(private removeUserUseCase: RemoveUserUseCase) {}

  handle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: number = Number(req.params.id);

      await this.removeUserUseCase.execute(id);

      return res.status(200).send("Removido com sucesso");
    } catch (error) {
      next(error);
    }
  };
}
