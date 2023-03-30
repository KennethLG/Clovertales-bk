import { AuthService } from "src/app/services/authService";
import Auth from "src/domain/useCases/auth";

export const authUseCaseFactory = () => {
  const authService = new AuthService();
  const auth = new Auth(authService);
  return auth;
}