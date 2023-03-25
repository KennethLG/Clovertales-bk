import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import { errorHandlerMiddleware } from "src/app/middleware/errorHandler";
import { ResponseHandler } from "src/presentation/utils/responses";
import { CreatePostDto } from "./createPostDto";
import { createPostDependencies } from "./postDependenciesFactory";

const handlerFunction: APIGatewayProxyHandler = async (
  event
): Promise<APIGatewayProxyResult> => {
  const createPostDto = JSON.parse(event.body as string) as CreatePostDto;

  const { createPost } = createPostDependencies();

  const newPost = await createPost.execute(createPostDto);

  return new ResponseHandler().success(newPost);
};

export const handler = errorHandlerMiddleware(handlerFunction)