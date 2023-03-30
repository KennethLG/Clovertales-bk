import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { errorHandlerMiddleware } from "src/app/middleware/errorHandler";
import { ResponseHandler } from "src/presentation/utils/responses";
import { deleteGalleryUseCaseFactory } from "./galleryFactory";

const handlerFunction: APIGatewayProxyHandlerV2 =
  async (event) => {
    const id = event.queryStringParameters?.id;

    const responseHandler = new ResponseHandler();

    if (!id) {
      return responseHandler.clientError("Please provide an ID");
    }

    const getGallery = deleteGalleryUseCaseFactory();

    const gallery = await getGallery.execute(id);

    return responseHandler.success({
      gallery,
    });
  };

export const handler = errorHandlerMiddleware(handlerFunction);
