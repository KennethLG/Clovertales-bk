import jwt from "jsonwebtoken";
import config from "src/config";

export class AuthService {
  validate(token: string) {
    return jwt.verify(token, config.jwt);
  }

  
}