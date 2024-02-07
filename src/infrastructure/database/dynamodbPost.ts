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

  override async update(
    createdAt: string,
    updateData: Omit<Post, "id" | "createdAt">
  ): Promise<Post | undefined> {
    const updateExpression =
      "set " +
      Object.keys(updateData)
        .map((key, index) => `#${key} = :value${index}`)
        .join(", ");
    const expressionAttributeNames = Object.keys(updateData).reduce(
      (acc, key) => ({ ...acc, [`#${key}`]: key }),
      {}
    ) as { [key: string]: string };
    const expressionAttributeValues = Object.keys(updateData).reduce(
      (acc, key, index) => ({
        ...acc,
        [`:value${index}`]: (updateData as any)[key],
      }),
      {}
    ) as { [key: string]: any };

    const params: AWS.DynamoDB.DocumentClient.UpdateItemInput = {
      TableName: this.tableName,
      Key: {
        id: "POST",
        createdAt: createdAt,
      },
      UpdateExpression: updateExpression,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: "ALL_NEW",
    };

    const result = await this.documentClient.update(params).promise();
    return result.Attributes as Post;
  }

  override async get(id: string): Promise<Post | undefined> {
    const params: AWS.DynamoDB.DocumentClient.QueryInput = {
      TableName: this.tableName,
      KeyConditionExpression: "#pk = :pkValue and #sk = :skValue",
      ExpressionAttributeNames: {
        "#pk": "id",
        "#sk": "createdAt",
      },
      ExpressionAttributeValues: {
        ":pkValue": "POST",
        ":skValue": id,
      },
    };

    const result = await this.documentClient.query(params).promise();
    return result.Items && result.Items.length > 0
      ? (result.Items[0] as Post)
      : undefined;
  }

  async getAllPaginated(
    limit: number,
    startKey?: { id: string; createdAt: string }
  ): Promise<{
    items: Post[];
    lastEvaluatedKey?: { id: string; createdAt: string } | undefined;
  }> {
    const params: AWS.DynamoDB.DocumentClient.QueryInput = {
      TableName: this.tableName,
      KeyConditionExpression: "id = :id",
      ExpressionAttributeValues: { ":id": "POST" },
      ScanIndexForward: false,
      Limit: limit,
    };

    if (startKey?.id && startKey.createdAt) {
      params.ExclusiveStartKey = {
        id: startKey.id,
        createdAt: startKey.createdAt,
      };
    }

    const result = await this.documentClient.query(params).promise();

    return {
      items: result.Items as Post[],
      lastEvaluatedKey: result.LastEvaluatedKey
        ? {
            id: result.LastEvaluatedKey.id,
            createdAt: result.LastEvaluatedKey.createdAt,
          }
        : undefined,
    };
  }
}
