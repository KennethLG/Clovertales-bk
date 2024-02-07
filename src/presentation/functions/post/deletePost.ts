import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { errorHandlerMiddleware } from "src/presentation/middleware/errorHandler";
import {
  deletePostUseCaseFactory,
  responseHandlerFactory,
} from "./postFactory";

const handlerFunction: APIGatewayProxyHandlerV2 = async (event) => {
  const id = event.queryStringParameters?.id;

  if (!id) {
    return responseHandlerFactory().clientError("Please provide a ID");
  }

  const getPost = deletePostUseCaseFactory();
  const posts = await getPost.execute(id);
  return responseHandlerFactory().success(posts);
};

export const handler = errorHandlerMiddleware(handlerFunction);
