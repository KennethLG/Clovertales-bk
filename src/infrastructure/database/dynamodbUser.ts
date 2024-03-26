import { User } from "src/domain/entities/user";
import { DynamoDbClient } from "./dynamodb";
import { QueryCommandInput, QueryCommand } from "@aws-sdk/lib-dynamodb";
import UserRepository from "src/domain/repositories/userRepository";

export class DynamoDbUserClient
  extends DynamoDbClient<User>
  implements UserRepository
{
  constructor() {
    super("UsersTable");
  }

  async getByEmail(email: string): Promise<User | undefined> {
    const params: QueryCommandInput = {
      TableName: this.tableName,
      IndexName: "EmailIndex",
      KeyConditionExpression: "email = :email",
      ExpressionAttributeValues: {
        ":email": email,
      },
      Limit: 1,
    };

    const command = new QueryCommand(params);

    const result = await this.documentClient.send(command);
    return result.Items && result.Items.length > 0
      ? (result.Items[0] as User)
      : undefined;
  }
}
