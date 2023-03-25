import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import { errorHandlerMiddleware } from "src/app/middleware/errorHandler";
import { deletePostUseCaseFactory, responseHandlerFactory } from "./postFactory";

const handlerFunction: APIGatewayProxyHandler = async (
  event
): Promise<APIGatewayProxyResult> => {
  const id = event.queryStringParameters?.id;

  if (!id) {
    return responseHandlerFactory().clientError("Please provide a ID");
  }

  const getPost = deletePostUseCaseFactory();
  const posts = await getPost.execute(id);
  return responseHandlerFactory().success(posts);
};

export const handler = errorHandlerMiddleware(handlerFunction);
