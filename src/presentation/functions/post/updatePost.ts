import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import { errorHandlerMiddleware } from "src/app/middleware/errorHandler";
import { UpdatePostDto } from "src/presentation/dto/postDto";
import { extractAndValidate } from "src/presentation/utils/extractAndValidate";
import { responseHandlerFactory, updatePostUseCaseFactory } from "./postFactory";

const handlerFunction: APIGatewayProxyHandler = async (
  event
): Promise<APIGatewayProxyResult> => {
  const body = JSON.parse(event.body as string) as UpdatePostDto;
  const updatePostDto = await extractAndValidate(UpdatePostDto, body);
  const updatePost = updatePostUseCaseFactory();

  const posts = await updatePost.execute(updatePostDto);

  return responseHandlerFactory().success(posts);
};

export const handler = errorHandlerMiddleware(handlerFunction);
