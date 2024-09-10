import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import config from "../config/config";

interface TokenPayload {
  id: number;
  name?: string;
  email?: string;
  iat: number;
  exp: number;
}

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const bearerExists = authHeader.split(" ")[0] === "Bearer";
    const token = bearerExists ? authHeader.split(" ")[1] : authHeader;

    jwt.verify(token, config.jwt.secret as string, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Invalid or expired token" });
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (req as any).user = decoded as TokenPayload;
      next();
    });
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
};
