import { AuthService } from "src/app/services/authService";

export default class Auth {
  constructor(private readonly authService: AuthService) {}

  execute(token: string, methodArn: string) {
    const decoded = this.authService.validate(token);
    const policyDocument = this.generatePolicyDocument('Allow', methodArn);

    return {
      decoded,
      policyDocument
    }
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