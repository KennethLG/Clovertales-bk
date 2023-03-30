import jwt from "jsonwebtoken";
import config from "src/config";

export class AuthService {
  validateToken(token: string) {
    return jwt.verify(token, config.jwt);
  }

  generateToken(payload: any, secret: string) {
    return jwt.sign(payload, secret, { expiresIn: "1h" });
  }

  async comparePasswords(password: string, storedPassword: string) {
    return password === storedPassword;
  }
}
