/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction, ErrorRequestHandler } from "express";

export const notFoundMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error("Not found") as ErrorWithStatus;
  error.status = 404;
  next(error);
};

export const errorHandlerMiddleware: ErrorRequestHandler = (
  error: ErrorWithStatus,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.status(error.status || 500);
  res.json({ success: false, message: "An unexpected error occurred", error: error.message });
};
