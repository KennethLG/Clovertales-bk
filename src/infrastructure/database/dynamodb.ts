import AWS from "aws-sdk";
import DynamoDB, { DocumentClient } from "aws-sdk/clients/dynamodb";
import DbClient from "src/domain/repositories/dbClient";

export class DynamoDbClient<T extends DynamoDB.DocumentClient.AttributeMap> implements DbClient<T> {
  private readonly tableName: string;
  private readonly documentClient: DocumentClient;

  constructor(
    tableName: string
  ) {
    this.tableName = tableName;
    this.documentClient = new AWS.DynamoDB.DocumentClient({
      region: 'us-east-1'
    });
  }

  async create(item: T): Promise<T> {
    const params = {
      TableName: this.tableName,
      Item: item,
    };

    await this.documentClient.put(params).promise();

    return item;
  }
}