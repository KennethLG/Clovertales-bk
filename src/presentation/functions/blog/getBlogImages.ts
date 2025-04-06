import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { createGetImagesUseCaseFactory } from "./blogFactory";
import { ResponseHandler } from "src/presentation/utils/responses";
import { errorHandlerMiddleware } from "src/presentation/middleware/errorHandler";

const handlerFunction: APIGatewayProxyHandlerV2 = async () => {
  const getBlogImagesUseCase = createGetImagesUseCaseFactory();

  const images = await getBlogImagesUseCase.execute();

  return new ResponseHandler().success({
    images
  })
};

export const handler = errorHandlerMiddleware(handlerFunction);
