// src/application/middlewares/errorHandlerMiddleware.ts
import {
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
} from "aws-lambda";
import { ResponseHandler } from "src/presentation/utils/responses";

export const errorHandlerMiddleware = (
  handler: APIGatewayProxyHandler
): APIGatewayProxyHandler => {
  return async (event, context, callback): Promise<APIGatewayProxyResult> => {
    try {
      // Execute the main handler function
      const result = await handler(event, context, callback);

      if (
        result &&
        typeof result === "object" &&
        "statusCode" in result &&
        "body" in result
      ) {
        return result;
      } else {
        throw new Error("Invalid result from the handler function");
      }
    } catch (error) {
      console.error("Unhandled error:", error);

      const responseHandler = new ResponseHandler();
      return responseHandler.serverError("An unexpected error occurred");
    }
  };
};