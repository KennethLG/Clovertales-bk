import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { errorHandlerMiddleware } from "src/presentation/middleware/errorHandler";
import { responseHandlerFactory } from "../post/postFactory";
import { getTasksPaginatedUseCaseFactory } from "./taskFactory";
import { extractAndValidate } from "src/presentation/utils/extractAndValidate";
import { GetPaginatedDto } from "src/presentation/dto/getPaginatedDto";

const handlerFunction: APIGatewayProxyHandlerV2 = async (event) => {
  const limit = event.queryStringParameters?.limit
    ? parseInt(event.queryStringParameters.limit, 10)
    : 10;

  const startKey = {
    id: event.queryStringParameters?.["startKey[id]"],
    createdAt: event.queryStringParameters?.["startKey[createdAt]"],
  };

  const getTasksPaginated = getTasksPaginatedUseCaseFactory();
  const responseHandler = responseHandlerFactory();

  if (startKey.id && startKey.createdAt) {
    const getTasksDto = await extractAndValidate(GetPaginatedDto, startKey);
    const tasks = await getTasksPaginated.execute(limit, getTasksDto);
    return responseHandler.success(tasks);
  }

  const tasks = await getTasksPaginated.execute(limit);
  return responseHandler.success(tasks)

}


export const handler = errorHandlerMiddleware(handlerFunction);