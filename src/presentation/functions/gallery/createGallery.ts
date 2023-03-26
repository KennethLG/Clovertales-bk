import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import { errorHandlerMiddleware } from "src/app/middleware/errorHandler";
import { CreateGalleryDto } from "src/presentation/dto/galleryDto";
import { extractAndValidate } from "src/presentation/utils/extractAndValidate";
import { ResponseHandler } from "src/presentation/utils/responses";
import { createGalleryUseCaseFactory } from "./galleryFactory";

const handlerFunction: APIGatewayProxyHandler = async (
  event
): Promise<APIGatewayProxyResult> => {
  const body = JSON.parse(event.body as string);
  const createGalleryDto = await extractAndValidate(CreateGalleryDto, body);

  const createGallery = createGalleryUseCaseFactory();

  const gallery = await createGallery.execute(createGalleryDto);

  return new ResponseHandler().success({
    gallery
  });
};

export const handler = errorHandlerMiddleware(handlerFunction);
