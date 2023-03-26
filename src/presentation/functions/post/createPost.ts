import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import { errorHandlerMiddleware } from "src/app/middleware/errorHandler";
import { extractAndValidate } from "src/presentation/utils/extractAndValidate";
import { CreatePostDto } from "../../dto/postDto";
import {
  createPostUseCaseFactory,
  responseHandlerFactory,
} from "./postFactory";

const handlerFunction: APIGatewayProxyHandler = async (
  event
): Promise<APIGatewayProxyResult> => {
  const createPostDto = await extractAndValidate(
    CreatePostDto,
    JSON.parse(event.body as string)
  );

  const createPost = createPostUseCaseFactory();

  const newPost = await createPost.execute(createPostDto);

  return responseHandlerFactory().success(newPost);
};

export const handler = errorHandlerMiddleware(handlerFunction);
