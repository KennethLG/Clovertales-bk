import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { errorHandlerMiddleware } from "src/app/middleware/errorHandler";
import { extractAndValidate } from "src/presentation/utils/extractAndValidate";
import { CreatePostDto } from "../../dto/postDto";
import {
  createPostUseCaseFactory,
  responseHandlerFactory,
} from "./postFactory";

const handlerFunction: APIGatewayProxyHandlerV2 = async (
  event
) => {
  const body = JSON.parse(event.body as string)
  console.log(body);
  const createPostDto = await extractAndValidate(CreatePostDto, body);

  const createPost = createPostUseCaseFactory();

  const newPost = await createPost.execute(createPostDto);

  return responseHandlerFactory().success(newPost);
};

export const handler = errorHandlerMiddleware(handlerFunction);
