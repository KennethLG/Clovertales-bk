import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import { errorHandlerMiddleware } from "src/app/middleware/errorHandler";
import { ResponseHandler } from "src/presentation/utils/responses";
import { getGalleryUseCaseFactory } from "./galleryFactory";

const handlerFunction: APIGatewayProxyHandler = async (): Promise<APIGatewayProxyResult> => {

  const getGallery = getGalleryUseCaseFactory();

  const gallery = await getGallery.execute();

  return new ResponseHandler().success({
    gallery,
  });
};

export const handler = errorHandlerMiddleware(handlerFunction);
