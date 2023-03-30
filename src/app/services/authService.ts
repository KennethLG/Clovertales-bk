import jwt from "jsonwebtoken";
import config from "src/config";

export class AuthService {
  validateToken(token: string) {
    return jwt.verify(token, config.jwt);
  }

  
}