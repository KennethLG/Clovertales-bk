import { User } from "src/domain/entities/user";
import { DynamoDbClient } from "./dynamodb";
import { IUserRepository } from "src/domain/repositories/dbClient";
import { DocumentClient } from "aws-sdk/clients/dynamodb";

export class DynamoDbUserClient
  extends DynamoDbClient<User>
  implements IUserRepository
{
  constructor() {
    super("UsersTable");
  }

  async getByEmail(email: string): Promise<User | undefined> {
    const params: DocumentClient.QueryInput = {
      TableName: this.tableName,
      IndexName: "EmailIndex",
      KeyConditionExpression: "email = :email",
      ExpressionAttributeValues: {
        ":email": email,
      },
      Limit: 1,
    };

    const result = await this.documentClient.query(params).promise();
    return result.Items && result.Items.length > 0
      ? (result.Items[0] as User)
      : undefined;
  }
}
