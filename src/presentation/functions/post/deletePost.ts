import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { errorHandlerMiddleware } from "src/presentation/middleware/errorHandler";
import {
  deletePostUseCaseFactory,
  responseHandlerFactory,
} from "./postFactory";

const handlerFunction: APIGatewayProxyHandlerV2 = async (event) => {
  const id = event.queryStringParameters?.id;
  const createdAt = event.queryStringParameters?.createdAt;

  if (!id || !createdAt) {
    return responseHandlerFactory().clientError(
      "Please provide both id and createdAt",
    );
  }

  const deletePost = deletePostUseCaseFactory();
  const posts = await deletePost.execute(id, createdAt);
  return responseHandlerFactory().success(posts);
};

export const handler = errorHandlerMiddleware(handlerFunction);
