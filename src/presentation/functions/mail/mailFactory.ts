import { MailService } from "src/app/services/mailService";
import SendMail from "src/domain/useCases/sendMail";

export const sendMailUseCaseFactory = () => {
  const mailService = new MailService();
  const sendMail = new SendMail(mailService);

  return sendMail;
}