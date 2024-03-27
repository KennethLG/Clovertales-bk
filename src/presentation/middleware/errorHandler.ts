import { APIGatewayProxyHandlerV2, APIGatewayProxyResultV2 } from "aws-lambda";
import { ValidationError } from "class-validator";
import { BadRequestError, CustomError } from "src/presentation/utils/customError";
import { ResponseHandler } from "src/presentation/utils/responses";

function translateDatabaseError(error: any): Error {
  if (error.name === 'ValidationException' || error.__type === 'com.amazon.coral.validate#ValidationException') {
    return new BadRequestError("The request parameters are invalid.");
  }
  return error;
}

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
        console.log("Result: ", result)
        return result;
      } else {
        console.error("Invalid, result ", result);
        throw new Error("Invalid result from the handler function");
      }
    } catch (error) {
      const responseHandler = new ResponseHandler();
      const translatedError = translateDatabaseError(error);
      
      console.error("Unexpected error: ", error);

      if (translatedError instanceof BadRequestError) {
        return responseHandler.clientError(translatedError.message);
      }

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

      return responseHandler
        .setStatusCode(500)
        .setBody({ message: "Internal Server Error" })
        .build();
    }
  };
