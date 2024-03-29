import config from "src/config";
import { BadRequestError } from "src/presentation/utils/customError";
import { IAuthService } from "src/domain/services/authService";

export default class Login {
  constructor(private readonly authService: IAuthService) {}

  execute(password: string, ip: string) {
    const { jwt, pass } = config;

    this.validatePassword(password, pass);
    return this.generateToken(jwt, ip);
  }

  private validatePassword(password: string, storedPassword: string) {
    const isValid = this.authService.comparePasswords(storedPassword, password);
    if (!isValid) {
      throw new BadRequestError("Invalid password");
    }
  }

  private generateToken(secret: string, ip: string) {
    return this.authService.generateToken(
      {
        ip,
        date: new Date().toISOString(),
      },
      secret
    );
  }
}
