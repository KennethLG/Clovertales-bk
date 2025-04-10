import { APIGatewayRequestSimpleAuthorizerHandlerV2 } from "aws-lambda";
import { authUseCaseFactory } from "./authFactory";

export const handler: APIGatewayRequestSimpleAuthorizerHandlerV2 = async (
  event,
) => {
  let isAuthorized = false;
  let principalId = null;

  try {
    const token = event.headers?.authorization;
    const ip = event.requestContext.http.sourceIp;

    console.log("ip: ", ip);

    if (!token) {
      throw new Error("No token provided");
    }

    const methodArn = event.routeArn;
    const auth = authUseCaseFactory();
    const response = auth.execute(token, methodArn);

    if (!response.decoded || typeof response.decoded === "string") {
      console.error("response not matching", JSON.stringify(response, null, 2));
      return { isAuthorized, context: undefined };
    }

    principalId = response.decoded.ip;
    console.log("response decoded ", principalId);

    if (!principalId) {
      console.error("no principalId");
      return { isAuthorized, context: undefined };
    }

    console.log("is authorized");
    isAuthorized = true;
  } catch (error) {
    console.error("Authorization error: ", error);
  }

  return {
    isAuthorized,
    context: isAuthorized ? { principalId } : undefined,
  };
};
