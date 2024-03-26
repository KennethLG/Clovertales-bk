import "reflect-metadata";
import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { errorHandlerMiddleware } from "src/presentation/middleware/errorHandler";
import { responseHandlerFactory } from "../post/postFactory";
import { createTaskUseCaseFactory } from "./taskFactory";
import { extractAndValidate } from "src/presentation/utils/extractAndValidate";
import { TrelloWebhookEvent } from "src/presentation/dto/taskDto";

const handlerFunction: APIGatewayProxyHandlerV2 = async (event) => {
  const body = JSON.parse(event.body || "{}" as string);
  console.log(JSON.stringify(body, null, 2))

  const dto = await extractAndValidate(TrelloWebhookEvent, body);

  const responseHandler = responseHandlerFactory();

  if (dto.action.type !== 'updateCard') {
    return responseHandler.clientError(`The action type is not correct. Type: ${dto.action.type}`);
  }

  if (!dto.action.data.listAfter) {
    return responseHandler.clientError(`No listAfter provided`);
  }

  const listAfter = dto.action.data.listAfter.name;
  if (listAfter !== 'Done') {
    return responseHandler.clientError(`The listAfter is not the desired. Name: ${listAfter}`);
  }
  
  const createTask = createTaskUseCaseFactory();
  createTask.exec({
    description: dto.action.data.card.desc,
    title: dto.action.data.card.name
  })

  return responseHandler.success();
}

export const handler = errorHandlerMiddleware(handlerFunction);