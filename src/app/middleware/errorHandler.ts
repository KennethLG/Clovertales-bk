import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import { CustomError } from "src/presentation/utils/customError";
import { ResponseHandler } from "src/presentation/utils/responses";

export const errorHandlerMiddleware =
  (handler: APIGatewayProxyHandler): APIGatewayProxyHandler =>
  async (event, context, callback): Promise<APIGatewayProxyResult> => {
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
      const responseHandler = new ResponseHandler();

      if (error instanceof CustomError) {
        // Handle custom errors
        return responseHandler
          .setStatusCode(error.statusCode)
          .setBody({
            message: error.message,
          })
          .build();
      }

      console.error("Unexpected error: ", error);

      return responseHandler
        .setStatusCode(500)
        .setBody({ message: "Internal Server Error" })
        .build();
    }
  };
