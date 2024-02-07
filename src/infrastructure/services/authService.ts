import jwt from "jsonwebtoken";
import config from "src/config";
import { IAuthService } from "src/domain/services/authService";

export class AuthService implements IAuthService {
  validateToken<T>(token: string) {
    return jwt.verify(token, config.jwt) as T;
  }

  generateToken(payload: any, secret: string) {
    return jwt.sign(payload, secret, { expiresIn: "1h" });
  }

  comparePasswords(password: string, storedPassword: string) {
    return password === storedPassword;
  }
}
