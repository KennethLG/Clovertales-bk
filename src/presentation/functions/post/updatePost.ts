import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import { errorHandlerMiddleware } from "src/app/middleware/errorHandler";
import { UpdatePostDto } from "src/presentation/dto/postDto";
import { responseHandlerFactory, updatePostUseCaseFactory } from "./postFactory";

const handlerFunction: APIGatewayProxyHandler = async (
  event
): Promise<APIGatewayProxyResult> => {
  const body = JSON.parse(event.body as string) as UpdatePostDto;
  const updatePost = updatePostUseCaseFactory();

  const posts = await updatePost.execute(body);

  return responseHandlerFactory().success(posts);
};

export const handler = errorHandlerMiddleware(handlerFunction);
