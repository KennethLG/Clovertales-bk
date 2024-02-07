import { IMailService } from "src/domain/services/mailService";

export default class SendMail {
  constructor(private mailService: IMailService) {}
  async execute(email: string, message: string) {
    return await this.mailService.sendMail(email, message);
  }
}
