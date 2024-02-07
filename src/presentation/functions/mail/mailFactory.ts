import { MailService } from "src/infrastructure/services/mailService";
import SendMail from "src/useCases/sendMail";

export const sendMailUseCaseFactory = () => {
  const mailService = new MailService();
  const sendMail = new SendMail(mailService);

  return sendMail;
};
