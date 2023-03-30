import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import { errorHandlerMiddleware } from "src/app/middleware/errorHandler";
import { LoginDto } from "src/presentation/dto/authDto";
import { extractAndValidate } from "src/presentation/utils/extractAndValidate";
import { ResponseHandler } from "src/presentation/utils/responses";
import { loginUseCaseFactory } from "./authFactory";

const handlerFunction: APIGatewayProxyHandler = async (
  event
): Promise<APIGatewayProxyResult> => {

  const body = JSON.parse(event.body as string);
  const ip = event.requestContext.identity.sourceIp;
  const loginDto = await extractAndValidate(LoginDto, body);
  const login = loginUseCaseFactory();
  const token = login.execute(loginDto.password, ip);

  return new ResponseHandler().success({
    token
  })
}

export const handler = errorHandlerMiddleware(handlerFunction);
