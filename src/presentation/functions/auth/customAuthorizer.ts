import { APIGatewayRequestSimpleAuthorizerHandlerV2 } from "aws-lambda";
import { authUseCaseFactory } from "./authFactory";

export const handler: APIGatewayRequestSimpleAuthorizerHandlerV2 = async (
  event
) => {
  try {
    const token = event.headers?.authorization;
    console.log("token", token);
  
    if (!token) {
      console.log("no token");
  
      return {
        isAuthorized: false,
      };
    }
    const methodArn = event.routeArn;
  
    const auth = authUseCaseFactory();
  
    const response = await auth.execute(token, methodArn);
  
    console.log("response", response);
  
    if (!response.decoded || typeof response.decoded === "string") {
      console.log("no decoded or string");
      return {
        isAuthorized: false,
      };
    }
  
    const principalId = response.decoded.ip;
    if (!principalId) {
      console.log("no principal");
      
      return {
        isAuthorized: false,
      };
    }
  
    console.log("correct", principalId)
  
    return {
      isAuthorized: true,
      context: {
        principalId,
      },
    };
  } catch (error) {
    console.error("Unexpected error: ", error);
    return {
      isAuthorized: false
    }
  }
};
