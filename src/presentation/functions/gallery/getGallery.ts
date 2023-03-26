import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import { errorHandlerMiddleware } from "src/app/middleware/errorHandler";
import { formatGallery } from "src/presentation/utils/formatGallery";
import { ResponseHandler } from "src/presentation/utils/responses";
import { getGalleryUseCaseFactory } from "./galleryFactory";

const handlerFunction: APIGatewayProxyHandler = async (): Promise<APIGatewayProxyResult> => {

  const getGallery = getGalleryUseCaseFactory();

  const gallery = await getGallery.execute();

  const formattedGallery = formatGallery(gallery, "/resources/gallery");

  return new ResponseHandler().success(formattedGallery);
};

export const handler = errorHandlerMiddleware(handlerFunction);
