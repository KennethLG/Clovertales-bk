import { errorHandlerMiddleware } from "src/app/middleware/errorHandler";
import { ResponseHandler } from "src/presentation/utils/responses";
// import { getMemberUseCaseFactory } from "./memberFactory";

const handlerFunction = async () => {
  return new ResponseHandler().success(null);
};

export const handler = errorHandlerMiddleware(handlerFunction);
