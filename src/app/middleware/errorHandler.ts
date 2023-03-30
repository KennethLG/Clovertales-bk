import { APIGatewayProxyHandlerV2, APIGatewayProxyResultV2 } from "aws-lambda";
import { ValidationError } from "class-validator";
import { CustomError } from "src/presentation/utils/customError";
import { ResponseHandler } from "src/presentation/utils/responses";

export const errorHandlerMiddleware =
  (handler: APIGatewayProxyHandlerV2): APIGatewayProxyHandlerV2 =>
  async (event, context, callback): Promise<APIGatewayProxyResultV2> => {
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

      if (
        Array.isArray(error) &&
        error.length > 0 &&
        error[0] instanceof ValidationError
      ) {
        const errorMessage = error.map((e) => e.toString()).join("; ");
        return responseHandler.clientError(errorMessage);
      }

      if (error instanceof CustomError) {
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
