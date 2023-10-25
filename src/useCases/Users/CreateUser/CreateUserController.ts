import { Request, Response, NextFunction } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  handle = async (req: Request, res: Response, next: NextFunction) => {
    const { name, image, type } = req.body;

    try {
      await this.createUserUseCase.execute({
        name,
        image,
        type,
      });

      return res.status(200).send("Adicionado com sucesso");
    } catch (error) {
      next(error);
    }
  };
}
