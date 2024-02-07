import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { errorHandlerMiddleware } from "src/app/middleware/errorHandler";
import {
  getPostUseCaseFactory,
  getPostsUseCaseFactory,
  responseHandlerFactory,
} from "./postFactory";
import { extractAndValidate } from "src/presentation/utils/extractAndValidate";
import { GetPostsDto } from "src/presentation/dto/postDto";

const handlerFunction: APIGatewayProxyHandlerV2 = async (event) => {
  const id = event.queryStringParameters?.id;
  const responseHandler = responseHandlerFactory();
  if (id) {
    const getPost = getPostUseCaseFactory();
    const post = await getPost.execute(id);
    return responseHandler.success(post);
  }

  const limit = event.queryStringParameters?.limit
    ? parseInt(event.queryStringParameters.limit, 10)
    : 10;

  const startKey = {
    id: event.queryStringParameters?.["startKey[id]"],
    createdAt: event.queryStringParameters?.["startKey[createdAt]"],
  };

  const getPostsDto = await extractAndValidate(GetPostsDto, startKey);
  const getPosts = getPostsUseCaseFactory();
  const posts = await getPosts.execute(limit, getPostsDto);
  return responseHandler.success(posts);
};

export const handler = errorHandlerMiddleware(handlerFunction);
