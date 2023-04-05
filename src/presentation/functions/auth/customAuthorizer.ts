import { APIGatewayRequestSimpleAuthorizerHandlerV2 } from "aws-lambda";
import { authUseCaseFactory } from "./authFactory";
import { verifyIp } from "src/presentation/utils/verifyIp";
import { isJwtPayload } from "src/presentation/utils/isJwtPayload";

export const handler: APIGatewayRequestSimpleAuthorizerHandlerV2 = async (
  event
) => {
  let isAuthorized = false;
  let principalId = null;

  try {
    const token = event.headers?.authorization;
    const ip = event.requestContext.http.sourceIp;

    console.log("ip: ", ip);

    const allowedIp = verifyIp(ip);

    if (allowedIp && token) {
      const methodArn = event.routeArn;
      const auth = authUseCaseFactory();
      const response = await auth.execute(token, methodArn);

      if (isJwtPayload(response.decoded)) {
        principalId = response.decoded.ip;

        if (principalId && principalId === allowedIp) {
          isAuthorized = true;
        }
      }
    }
  } catch (error) {
    console.error("Authorization error: ", error);
  }

  return {
    isAuthorized,
    context: isAuthorized ? { principalId } : undefined,
  };
};
