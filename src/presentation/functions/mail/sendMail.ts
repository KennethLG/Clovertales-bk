import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import { errorHandlerMiddleware } from "src/app/middleware/errorHandler";
import { ResponseHandler } from "src/presentation/utils/responses";
import { SendMailDto } from "../../dto/sendMailDto";
import { sendMailUseCaseFactory } from "./mailFactory";

const handlerFunction: APIGatewayProxyHandler = async (
  event
): Promise<APIGatewayProxyResult> => {
  const body = JSON.parse(event.body as string) as SendMailDto;
  const sendMail = sendMailUseCaseFactory();

  const response = await sendMail.execute(body);

  return new ResponseHandler().success(response)
};

export const handler = errorHandlerMiddleware(handlerFunction);