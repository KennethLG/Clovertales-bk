import nodemailer, { SentMessageInfo, Transporter } from "nodemailer";
import config from "src/config";
import { IMailService } from "src/domain/services/mailService";

export class MailService implements IMailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: config.mailer.host,
      port: config.mailer.port,
      auth: {
        user: config.mailer.user,
        pass: config.mailer.pass,
      },
    });
  }

  async sendMail(email: string, message: string): Promise<SentMessageInfo> {
    return await this.transporter.sendMail({
      from: email,
      to: config.mailer.dest,
      subject: `${email} sent you a message`,
      text: message,
      html: message,
    });
  }
}
