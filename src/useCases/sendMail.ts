import { MailService } from "src/infrastructure/services/mailService";
import { SendMailDto } from "src/presentation/dto/sendMailDto";

export default class SendMail {
  constructor(private mailService: MailService) {}
  async execute(sendMailDto: SendMailDto) {
    return await this.mailService.sendMail(sendMailDto);
  }
}
