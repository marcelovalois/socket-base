import jwt from "jsonwebtoken";
import config from "../../../config/config";

interface ICheckRequest {
  pontuandoAuthToken: string;
}

export class CheckUseCase {
  constructor() {}

  execute = async (data: ICheckRequest) => {
    try {
      let decodedToken = null;
      const pontuandoAuthToken = data.pontuandoAuthToken;
      if (pontuandoAuthToken) {
        const bearerExists = pontuandoAuthToken.split(" ")[0] === "Bearer";
        const token = bearerExists ? pontuandoAuthToken.split(" ")[1] : pontuandoAuthToken;

        jwt.verify(token, config.jwt.secret as string, (err, decoded) => {
          if (err) {
            throw new Error("Invalid or expired token");
          }
          decodedToken = decoded;
        });
        return decodedToken;
      }
      return null;
    } catch (error) {
      throw new Error(`${error}`);
    }
  };
}
