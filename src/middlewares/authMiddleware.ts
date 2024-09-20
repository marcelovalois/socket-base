import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import config from "../config/config";

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  // Token obtido através do cookie
  const cookies = req.cookies;
  const pontuandoAuthToken: string = cookies["pontuandoAuthToken"] ?? "";

  // Token obtido através do header
  // const pontuandoAuthTokenHeader = req.headers.authorization;
  // const pontuandoAuthToken: string = pontuandoAuthTokenHeader ? pontuandoAuthTokenHeader.toString() : "";

  if (pontuandoAuthToken) {
    const bearerExists = pontuandoAuthToken.split(" ")[0] === "Bearer";
    const token = bearerExists ? pontuandoAuthToken.split(" ")[1] : pontuandoAuthToken;

    jwt.verify(token, config.jwt.secret as string, (err, decoded) => {
      if (err) {
        return res.status(401).json({ success: false, message: "Invalid or expired token", error: err.message });
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (req as any).user = decoded as TokenPayload;
      next();
    });
  } else {
    return res.status(401).json({ success: false, message: "No token provided" });
  }
};
