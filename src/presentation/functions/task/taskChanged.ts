import "reflect-metadata";
import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { errorHandlerMiddleware } from "src/presentation/middleware/errorHandler";
import { responseHandlerFactory } from "../post/postFactory";
import { createTaskUseCaseFactory } from "./taskFactory";
import { extractAndValidate } from "src/presentation/utils/extractAndValidate";
import { TrelloWebhookEvent } from "src/presentation/dto/taskDto";

const handlerFunction: APIGatewayProxyHandlerV2 = async (event) => {
  const body = JSON.parse(event.body || "{}" as string);
  console.log(body)

  const dto = await extractAndValidate(TrelloWebhookEvent, body);

  if (body.action.type === 'updateCard' && body.action.data.listAfter) {
    const listAfter = dto.action.data.listAfter.name;
    if (listAfter === 'Done') {
      const createTask = createTaskUseCaseFactory();
      createTask.exec({
        description: dto.action.data.card.desc,
        title: dto.action.data.card.name
      })
      
    }
  }

  return responseHandlerFactory().success();
}

export const handler = errorHandlerMiddleware(handlerFunction);