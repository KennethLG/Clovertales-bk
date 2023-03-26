import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import { errorHandlerMiddleware } from "src/app/middleware/errorHandler";
import { CreateGalleryDto } from "src/presentation/dto/galleryDto";
import { ResponseHandler } from "src/presentation/utils/responses";
import { createGalleryUseCaseFactory } from "./galleryFactory";

const handlerFunction: APIGatewayProxyHandler = async (
  event
): Promise<APIGatewayProxyResult> => {
  const createGalleryDto = JSON.parse(event.body as string) as CreateGalleryDto;

  const createGallery = createGalleryUseCaseFactory();

  const newGallery = await createGallery.execute(createGalleryDto);

  return new ResponseHandler().success({
    newGallery
  });
};

export const handler = errorHandlerMiddleware(handlerFunction);
