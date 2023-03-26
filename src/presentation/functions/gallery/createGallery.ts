import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import { errorHandlerMiddleware } from "src/app/middleware/errorHandler";
import { CreateGalleryDto } from "src/presentation/dto/galleryDto";
import { ResponseHandler } from "src/presentation/utils/responses";
import { createGalleryUseCaseFactory, s3ServiceFactory } from "./galleryFactory";

const handlerFunction: APIGatewayProxyHandler = async (
  event
): Promise<APIGatewayProxyResult> => {
  const createGalleryDto = JSON.parse(event.body as string) as CreateGalleryDto;

  const createGallery = createGalleryUseCaseFactory();
  const s3Service = s3ServiceFactory();

  const newGallery = await createGallery.execute(createGalleryDto);
  const location = await s3Service.uploadImage(createGalleryDto.image);

  return new ResponseHandler().success({
    newGallery,
    location
  });
};

export const handler = errorHandlerMiddleware(handlerFunction);
