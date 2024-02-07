export abstract class IAuthService {
  abstract validateToken<T = any>(token: string): T;
  abstract generateToken(payload: any, secret: string): string;
  abstract comparePasswords(password: string, storedPassword: string): boolean;
}
