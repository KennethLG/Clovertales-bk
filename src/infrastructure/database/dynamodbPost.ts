import { DynamoDbClient } from "./dynamodb";
import { Post } from "src/domain/entities/post";
import { UpdateCommand, QueryCommand, QueryCommandInput } from "@aws-sdk/lib-dynamodb";
import { PostRepository } from "src/domain/repositories/postRepository";


export class DynamoDbPostClient
  extends DynamoDbClient<Post>
  implements PostRepository
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

    const command = new UpdateCommand({
      TableName: this.tableName,
      Key: {
        id: "POST",
        createdAt: createdAt,
      },
      UpdateExpression: updateExpression,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: "ALL_NEW",
    });

    const result = await this.documentClient.send(command);
    return result.Attributes as Post;
  }

  override async get(id: string): Promise<Post | undefined> {
    const command = new QueryCommand({
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
    })
    const result = await this.documentClient.send(command);
    return result.Items && result.Items.length > 0
      ? (result.Items[0] as Post)
      : undefined;
  }
}
