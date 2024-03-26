import {
  DeleteCommandInput,
  GetCommandInput,
  ScanCommandInput,
  UpdateCommandInput,
  PutCommand,
  DeleteCommand,
  GetCommand,
  ScanCommand,
  UpdateCommand,
  QueryCommandInput,
  QueryCommand
} from "@aws-sdk/lib-dynamodb";

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DbClient } from "src/domain/repositories/dbClient";

export class DynamoDbClient<T extends Record<string, any>>
  implements DbClient<T>
{
  tableName: string;
  documentClient: DynamoDBClient;

  constructor(tableName: string) {
    this.tableName = tableName;
    this.documentClient = new DynamoDBClient({
      region: "us-east-1",
    });
  }



  async delete(id: string): Promise<void> {
    const params: DeleteCommandInput = {
      TableName: this.tableName,
      Key: {
        id,
      },
    };

    const command = new DeleteCommand(params);


    await this.documentClient.send(command);
  }

  async create(item: T): Promise<T> {
    const command = new PutCommand({
      TableName: this.tableName,
      Item: item,
    })

    await this.documentClient.send(command);

    return item;
  }

  async get(id: string): Promise<T | undefined> {
    const params: GetCommandInput = {
      TableName: this.tableName,
      Key: {
        id,
      },
    };

    const command = new GetCommand(params);

    const result = await this.documentClient.send(command);
    return result.Item as T | undefined;
  }

  async getAll(): Promise<T[]> {
    const params: ScanCommandInput = {
      TableName: this.tableName,
    };

    const command = new ScanCommand(params);

    const result = await this.documentClient.send(command);
    return result.Items as T[];
  }

  async update(id: string, updateData: Omit<T, "id">): Promise<T | undefined> {
    const updateExpression = Object.keys(updateData)
      .map((key, index) => `${key} = :value${index}`)
      .join(", ");

    const expressionAttributeValues = Object.keys(updateData).reduce(
      (accumulator, key, index) => {
        accumulator[`:value${index}`] = updateData[key];
        return accumulator;
      },
      {} as Record<string, any>
    );

    const params: UpdateCommandInput = {
      TableName: this.tableName,
      Key: {
        id,
      },
      UpdateExpression: `SET ${updateExpression}`,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: "ALL_NEW",
    };

    const command = new UpdateCommand(params);

    const result = await this.documentClient.send(command);
    return result.Attributes as T | undefined;
  }

  async getAllPaginated(
    id: string,
    limit?: number,
    startKey?: { id: string; createdAt: string }
  ): Promise<{
    items: T[];
    lastEvaluatedKey?: { id: string; createdAt: string } | undefined;
  }> {
    const params: QueryCommandInput = {
      TableName: this.tableName,
      KeyConditionExpression: "id = :id",
      ExpressionAttributeValues: { ":id": id },
      ScanIndexForward: false,
      Limit: limit,
    };

    if (startKey?.id && startKey.createdAt) {
      params.ExclusiveStartKey = {
        id: startKey.id,
        createdAt: startKey.createdAt,
      };
    }

    const command = new QueryCommand(params);

    const result = await this.documentClient.send(command);

    return {
      items: result.Items as T[],
      lastEvaluatedKey: result.LastEvaluatedKey
        ? {
            id: result.LastEvaluatedKey.id,
            createdAt: result.LastEvaluatedKey.createdAt,
          }
        : undefined,
    };
  }
}
