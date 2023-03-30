import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { errorHandlerMiddleware } from "src/app/middleware/errorHandler";
import {
  getPostUseCaseFactory,
  responseHandlerFactory,
} from "./postFactory";

const handlerFunction: APIGatewayProxyHandlerV2 = async (
  event
) => {
  const id = event.queryStringParameters?.id
  const getPost = getPostUseCaseFactory();
  
  const posts = await getPost.execute(id);

  return responseHandlerFactory().success(posts);
};

export const handler = errorHandlerMiddleware(handlerFunction);
