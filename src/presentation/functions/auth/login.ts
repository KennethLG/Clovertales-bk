import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { errorHandlerMiddleware } from "src/app/middleware/errorHandler";
import { LoginDto } from "src/presentation/dto/authDto";
import { extractAndValidate } from "src/presentation/utils/extractAndValidate";
import { ResponseHandler } from "src/presentation/utils/responses";
import { loginUseCaseFactory } from "./authFactory";

const handlerFunction: APIGatewayProxyHandlerV2 = async (event) => {
  const body = JSON.parse(event.body as string);
  const ip = event.requestContext.http.sourceIp;
  const loginDto = await extractAndValidate(LoginDto, body);
  const login = loginUseCaseFactory();
  const token = login.execute(loginDto.password, ip);

  return new ResponseHandler().success({
    token,
  });
};

export const handler = errorHandlerMiddleware(handlerFunction);
