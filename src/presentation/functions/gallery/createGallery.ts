import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { errorHandlerMiddleware } from "src/app/middleware/errorHandler";
import { CreateGalleryDto } from "src/presentation/dto/galleryDto";
import { extractAndValidate } from "src/presentation/utils/extractAndValidate";
import { ResponseHandler } from "src/presentation/utils/responses";
import { createGalleryUseCaseFactory } from "./galleryFactory";

const handlerFunction: APIGatewayProxyHandlerV2 = async (
  event
) => {
  const body = JSON.parse(event.body as string);
  const createGalleryDto = await extractAndValidate(CreateGalleryDto, body);

  const createGallery = createGalleryUseCaseFactory();

  const gallery = await createGallery.execute(createGalleryDto);

  return new ResponseHandler().success({
    gallery
  });
};

export const handler = errorHandlerMiddleware(handlerFunction);
