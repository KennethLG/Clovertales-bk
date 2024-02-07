import { AuthService } from "src/infrastructure/services/authService";
import config from "src/config";

export default class Auth {
  constructor(private readonly authService: AuthService) {}

  execute(token: string, methodArn: string) {
    const decoded = this.authService.validateToken(token);
    const policyDocument = this.generatePolicyDocument("Allow", methodArn);

    return {
      decoded,
      policyDocument,
    };
  }

  private generatePolicyDocument(effect: string, resource: string) {
    return {
      Version: "2012-10-17",
      Statement: [
        {
          Action: "execute-api:Invoke",
          Effect: effect,
          Resource: resource,
        },
      ],
    };
  }
}
