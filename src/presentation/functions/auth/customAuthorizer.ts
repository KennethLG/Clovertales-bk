import { APIGatewayTokenAuthorizerHandler } from "aws-lambda";
import { authUseCaseFactory } from "./authFactory";

export const handler: APIGatewayTokenAuthorizerHandler = async (event) => {
  const token = event.authorizationToken;
  const methodArn = event.methodArn;

  const auth = authUseCaseFactory();

  const response = await auth.execute(token, methodArn);

  return {
    principalId: response.decoded as string,
    policyDocument: response.policyDocument,
  };
};

// export const handler = errorHandlerMiddleware(handlerFunction);
