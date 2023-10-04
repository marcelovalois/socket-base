import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';

interface ErrorWithStatus extends Error {
    status?: number;
}

export const notFoundMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const error = new Error('Not found') as ErrorWithStatus;
    error.status = 404;
    next(error);
};

export const errorHandlerMiddleware: ErrorRequestHandler = (error: ErrorWithStatus, req: Request, res: Response, next: NextFunction) => {
    res.status(error.status || 500);
    res.json({ error: error.message });
};
