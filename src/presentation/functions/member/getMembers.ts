import { errorHandlerMiddleware } from "src/presentation/middleware/errorHandler";
import { ResponseHandler } from "src/presentation/utils/responses";
import { getMemberUseCaseFactory } from "./memberFactory";

const handlerFunction = async () => {
  const getMembers = getMemberUseCaseFactory();
  const members = await getMembers.getAll();
  return new ResponseHandler().success(members);
};

export const handler = errorHandlerMiddleware(handlerFunction);
