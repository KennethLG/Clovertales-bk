export abstract class IMailService {
  abstract sendMail(email: string, message: string): Promise<boolean>;
}
