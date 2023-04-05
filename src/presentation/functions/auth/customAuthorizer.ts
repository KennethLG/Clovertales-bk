import { APIGatewayRequestSimpleAuthorizerHandlerV2 } from "aws-lambda";
import { authUseCaseFactory } from "./authFactory";
import { verifyIp } from "src/presentation/utils/verifyIp";

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
      console.log("is allowed", token, allowedIp);
      const methodArn = event.routeArn;
      const auth = authUseCaseFactory();
      const response = await auth.execute(token, methodArn);

      if (response.decoded && typeof response.decoded !== "string") {
        principalId = response.decoded.ip;
        console.log("response decoded ", principalId)

        if (principalId && verifyIp(principalId)) {
          console.log("is authorized")
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
