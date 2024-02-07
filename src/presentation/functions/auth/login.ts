import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { errorHandlerMiddleware } from "src/presentation/middleware/errorHandler";
import { LoginDto } from "src/presentation/dto/authDto";
import { extractAndValidate } from "src/presentation/utils/extractAndValidate";
import { ResponseHandler } from "src/presentation/utils/responses";
import { loginUseCaseFactory } from "./authFactory";
import { verifyIp } from "src/presentation/utils/verifyIp";

const handlerFunction: APIGatewayProxyHandlerV2 = async (event) => {
  const body = JSON.parse(event.body as string);
  const ip = event.requestContext.http.sourceIp;

  const responseHandler = new ResponseHandler();

  const allowedIp = verifyIp(ip);
  if (!allowedIp) {
    console.log("Ip not allowed: ", ip);
    return responseHandler.forbbiden();
  }

  const loginDto = await extractAndValidate(LoginDto, body);
  const login = loginUseCaseFactory();
  const token = login.execute(loginDto.password, ip);

  return responseHandler.success({
    token,
  });
};

export const handler = errorHandlerMiddleware(handlerFunction);
