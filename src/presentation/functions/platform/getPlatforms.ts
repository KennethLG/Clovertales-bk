import { errorHandlerMiddleware } from "src/app/middleware/errorHandler";
import { ResponseHandler } from "src/presentation/utils/responses";
import { getPlatformsUseCaseFactory } from "./platformFactory";

const handlerFunction = async () => {
  const getPlatforms = getPlatformsUseCaseFactory();
  const platforms = await getPlatforms.getAll();
  return new ResponseHandler().success(platforms);
};

export const handler = errorHandlerMiddleware(handlerFunction);
