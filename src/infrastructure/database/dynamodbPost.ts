import { DynamoDbClient } from "./dynamodb";
import { IPostRepository } from "src/domain/repositories/dbClient";
import { Post } from "src/domain/entities/post";

export class DynamoDbPostClient
  extends DynamoDbClient<Post>
  implements IPostRepository
{
  constructor() {
    super("PostsTable");
  }

  async getAllPaginated(
    limit?: number | undefined,
    startKey?: string | undefined
  ): Promise<{ items: Post[]; lastEvaluatedKey?: string | undefined }> {
    const params: AWS.DynamoDB.DocumentClient.ScanInput = {
      TableName: this.tableName,
      Limit: limit,
    };

    if (startKey) {
      params.ExclusiveStartKey = {
        id: startKey,
      };
    }

    const result = await this.documentClient.scan(params).promise();
    return {
      items: result.Items as Post[],
      lastEvaluatedKey: result.LastEvaluatedKey
        ? result.LastEvaluatedKey.id
        : undefined,
    };
  }
}
