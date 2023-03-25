import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import { errorHandlerMiddleware } from "src/app/middleware/errorHandler";
import {
  getPostUseCaseFactory,
  responseHandlerFactory,
} from "./postFactory";

const handlerFunction: APIGatewayProxyHandler = async (
  event
): Promise<APIGatewayProxyResult> => {
  if (!event.pathParameters?.id) {
    return responseHandlerFactory().clientError("Please provide a id");
  }

  const id = event.pathParameters.id;

  const getPost = getPostUseCaseFactory();

  const newPost = await getPost.execute(id);

  return responseHandlerFactory().success(newPost);
};

export const handler = errorHandlerMiddleware(handlerFunction);
