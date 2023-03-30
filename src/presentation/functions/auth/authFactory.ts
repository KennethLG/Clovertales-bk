import { AuthService } from "src/app/services/authService";
import Auth from "src/domain/useCases/auth/auth";
import Login from "src/domain/useCases/auth/login";

export const authServiceFactory = () => {
  return new AuthService();
}

export const authUseCaseFactory = () => {
  
  const auth = new Auth(authServiceFactory());
  return auth;
}

export const loginUseCaseFactory = () => {
  const login = new Login(authServiceFactory());
  return login;
}