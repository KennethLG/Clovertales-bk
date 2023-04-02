import AWS from "aws-sdk";
import DynamoDB, { DocumentClient } from "aws-sdk/clients/dynamodb";
import { DbClient } from "src/domain/repositories/dbClient";

export class DynamoDbClient<T extends DynamoDB.DocumentClient.AttributeMap>
  implements DbClient<T>
{
  tableName: string;
  documentClient: DocumentClient;

  constructor(tableName: string) {
    this.tableName = tableName;
    this.documentClient = new AWS.DynamoDB.DocumentClient({
      region: "us-east-1",
    });
  }

  async delete(id: string): Promise<void> {
    const params: AWS.DynamoDB.DocumentClient.DeleteItemInput = {
      TableName: this.tableName,
      Key: {
        id,
      },
    };

    await this.documentClient.delete(params).promise();
  }

  async create(item: T): Promise<T> {
    const params = {
      TableName: this.tableName,
      Item: item,
    };

    await this.documentClient.put(params).promise();

    return item;
  }

  async get(id: string): Promise<T | undefined> {
    const params: AWS.DynamoDB.DocumentClient.GetItemInput = {
      TableName: this.tableName,
      Key: {
        id,
      },
    };

    const result = await this.documentClient.get(params).promise();
    return result.Item as T | undefined;
  }

  async getAll(): Promise<T[]> {
    const params: AWS.DynamoDB.DocumentClient.ScanInput = {
      TableName: this.tableName,
    };

    const result = await this.documentClient.scan(params).promise();
    return result.Items as T[];
  }

  async update(id: string, updateData: Partial<T>): Promise<T | undefined> {
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

    const params: AWS.DynamoDB.DocumentClient.UpdateItemInput = {
      TableName: this.tableName,
      Key: {
        id,
      },
      UpdateExpression: `SET ${updateExpression}`,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: "ALL_NEW",
    };

    const result = await this.documentClient.update(params).promise();
    return result.Attributes as T | undefined;
  }
}
