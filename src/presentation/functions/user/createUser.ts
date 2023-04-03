import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { errorHandlerMiddleware } from "src/app/middleware/errorHandler";
import { extractAndValidate } from "src/presentation/utils/extractAndValidate";
import { CreateUserDto } from "../../dto/userDto";
import { createUserUseCaseFactory } from "./userFactory";
import { responseHandlerFactory } from "../post/postFactory";

const handlerFunction: APIGatewayProxyHandlerV2 = async (event) => {
  const body = JSON.parse(event.body as string);
  const createUserDto = await extractAndValidate(CreateUserDto, body);

  const createUser = createUserUseCaseFactory();

  await createUser.execute(createUserDto);

  return responseHandlerFactory().created();
};

export const handler = errorHandlerMiddleware(handlerFunction);
