import { APIGatewayProxyEvent } from "aws-lambda";
import nodemailer from "nodemailer";
import config from "src";
import { SuccessResponseCS } from "src/presentation/utils/responses";

interface SendEmailRequest {
  email: string;
  message: string;
}

export const handler = async (event: APIGatewayProxyEvent) => {
  const body = JSON.parse(event.body as string) as SendEmailRequest;

  try {
    const transporter = nodemailer.createTransport({
      host: config.mailer.host,
      port: config.mailer.port,
      secure: false,
      auth: {
        user: config.mailer.user,
        pass: config.mailer.pass,
      },
    });

    const info = await transporter.sendMail({
      from: body.email,
      to: config.mailer.user,
      subject: `${body.email} sent you a message`,
      text: body.message,
      html: body.message,
    });
  } catch (error) {
    console.error(error);
  }

  return new SuccessResponseCS(
    {
      data: {
        email: body.email,
        message: body.message,
      },
    },
    "Email sent successfully"
  );
};
