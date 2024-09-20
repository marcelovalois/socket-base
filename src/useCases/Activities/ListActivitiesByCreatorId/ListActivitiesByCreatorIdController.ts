import { Request, Response, NextFunction } from "express";
import { ListActivitiesByCreatorIdUseCase } from "./ListActivitiesByCreatorIdUseCase";
import { z } from "zod";

interface RequestWithUser extends Request {
  user: TokenPayload;
}

const listActivitiesByCreatorIdSchema = z.object({
  id: z.union([z.string(), z.number()]).transform((value) => Number(value)),
});

export class ListActivitiesByCreatorIdController {
  constructor(private listActivitiesByUserIdUseCase: ListActivitiesByCreatorIdUseCase) {}

  private simulateDelay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  handle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const reqWithUser = req as RequestWithUser;

      const { id } = listActivitiesByCreatorIdSchema.parse(reqWithUser.user);

      if (!id) {
        return res.status(400).json({ error: "Invalid id" });
      }

      // await this.simulateDelay(5000);

      const activities = await this.listActivitiesByUserIdUseCase.execute({ user_id: id });

      if (activities.length === 0) {
        return res.status(404).json({ success: false, message: "No activities found", data: [] });
      }

      return res.status(200).json({ success: true, message: "Activities successfully found", data: activities });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.issues });
      } else {
        next(error);
      }
    }
  };
}
