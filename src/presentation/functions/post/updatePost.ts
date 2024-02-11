import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { errorHandlerMiddleware } from "src/presentation/middleware/errorHandler";
import { UpdatePostDto } from "src/presentation/dto/postDto";
import { extractAndValidate } from "src/presentation/utils/extractAndValidate";
import {
  responseHandlerFactory,
  updatePostUseCaseFactory,
} from "./postFactory";

const handlerFunction: APIGatewayProxyHandlerV2 = async (event) => {
  const body = JSON.parse(event.body as string) as UpdatePostDto;
  const updatePostDto = await extractAndValidate(UpdatePostDto, body);
  const updatePost = updatePostUseCaseFactory();

  const posts = await updatePost.execute(updatePostDto.id, {
    available: updatePostDto.available,
    content: updatePostDto.content,
    description: updatePostDto.description,
    imageUrl: updatePostDto.imageUrl,
    title: updatePostDto.title,
  });

  return responseHandlerFactory().success(posts);
};

export const handler = errorHandlerMiddleware(handlerFunction);
