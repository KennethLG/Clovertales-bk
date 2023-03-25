import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import { errorHandlerMiddleware } from "src/app/middleware/errorHandler";
import { CreatePostDto } from "../../dto/createPostDto";
import { createPostUseCaseFactory, responseHandlerFactory } from "./postFactory";

const handlerFunction: APIGatewayProxyHandler = async (
  event
): Promise<APIGatewayProxyResult> => {
  const createPostDto = JSON.parse(event.body as string) as CreatePostDto;

  const createPost = createPostUseCaseFactory();

  const newPost = await createPost.execute(createPostDto);

  return responseHandlerFactory().success(newPost);
};

export const handler = errorHandlerMiddleware(handlerFunction)