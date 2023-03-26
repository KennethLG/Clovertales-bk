import nodemailer, { SentMessageInfo, Transporter } from "nodemailer";
import config from "src/config";
import { SendMailDto } from "src/presentation/dto/sendMailDto";

export class MailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: config.mailer.host,
      port: config.mailer.port,
      secure: false,
      auth: {
        user: config.mailer.user,
        pass: config.mailer.pass,
      },
    });
  }

  async sendMail(
    sendMailDto: SendMailDto
  ): Promise<SentMessageInfo> {

    return await this.transporter.sendMail({
      from: sendMailDto.email,
      to: config.mailer.user,
      subject: `${sendMailDto.email} sent you a message`,
      text: sendMailDto.message,
      html: sendMailDto.message,
    });
  }
}