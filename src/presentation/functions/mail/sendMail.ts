import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { errorHandlerMiddleware } from "src/presentation/middleware/errorHandler";
import { ResponseHandler } from "src/presentation/utils/responses";
import { SendMailDto } from "../../dto/sendMailDto";
import { sendMailUseCaseFactory } from "./mailFactory";

const handlerFunction: APIGatewayProxyHandlerV2 = async (event) => {
  const { email, message } = JSON.parse(event.body as string) as SendMailDto;
  const sendMail = sendMailUseCaseFactory();

  const response = await sendMail.execute(email, message);

  return new ResponseHandler().success(response);
};

export const handler = errorHandlerMiddleware(handlerFunction);
