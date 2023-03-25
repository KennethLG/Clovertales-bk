// src/application/middlewares/errorHandlerMiddleware.ts
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";
import { ResponseHandler } from "src/presentation/utils/responses";

export class ErrorHandlerMiddleware {
  constructor(
    private readonly handler: (
      event: APIGatewayProxyEvent,
      context: Context
    ) => Promise<APIGatewayProxyResult>
  ) {}

  public async process(
    event: APIGatewayProxyEvent,
    context: Context
  ): Promise<APIGatewayProxyResult> {
    try {
      const result = await this.handler(event, context);
      return result;
    } catch (error) {
      const responseHandler = new ResponseHandler();

      if (error instanceof Error) {
        console.error("Error:", error.message);
        return responseHandler.serverError(error.message);
      } else {
        console.error("Unknown error:", error);
        return responseHandler.serverError("An unexpected error occurred");
      }
    }
  }
}
