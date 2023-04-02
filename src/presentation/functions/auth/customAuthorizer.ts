import { APIGatewayRequestSimpleAuthorizerHandlerV2 } from "aws-lambda";
import { authUseCaseFactory } from "./authFactory";

export const handler: APIGatewayRequestSimpleAuthorizerHandlerV2 = async (
  event
) => {
  try {
    const token = event.headers?.authorization;
  
    if (!token) {  
      return {
        isAuthorized: false,
      };
    }
    const methodArn = event.routeArn;
  
    const auth = authUseCaseFactory();
  
    const response = await auth.execute(token, methodArn);
  
    if (!response.decoded || typeof response.decoded === "string") {
      return {
        isAuthorized: false,
      };
    }
  
    const principalId = response.decoded.ip;
    if (!principalId) {
      return {
        isAuthorized: false,
      };
    }
  
  
    return {
      isAuthorized: true,
      context: {
        principalId,
      },
    };
  } catch (error) {
    console.error("Authorization error: ", error);
    return {
      isAuthorized: false
    }
  }
};
