import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { errorHandlerMiddleware } from "src/presentation/middleware/errorHandler";
import { responseHandlerFactory } from "../post/postFactory";

const handlerFunction: APIGatewayProxyHandlerV2 = async (event) => {
  const body = JSON.parse(event.body || "{}" as string);

  console.log(body)

  if (body.action.type === 'updateCard' && body.action.data.listAfter) {
    const listAfter = body.action.data.listAfter.name;
    const listBefore = body.action.data.listBefore.name;
    const cardName = body.action.data.card.name;

    // Check if the card was moved to the "Done" list
    if (listAfter === 'Done') {
      console.log(`Card "${cardName}" moved from "${listBefore}" to "Done"`);
      
      // Optionally, log more details or take additional actions here
    }
  }

  return responseHandlerFactory().success();
}

export const handler = errorHandlerMiddleware(handlerFunction);