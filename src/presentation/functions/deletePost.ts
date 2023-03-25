import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import AWS from "aws-sdk";

export const handler: APIGatewayProxyHandler = async (
  event,
  _context
): Promise<APIGatewayProxyResult> => {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  const TableName = "PostsTable";
  try {
    if (!event.queryStringParameters?.id) {
      return {
        statusCode: 400,
        body: JSON.stringify("Please provide an id")
      }
    }

    const params: AWS.DynamoDB.DocumentClient.DeleteItemInput = {
      TableName,
      Key: {
        id: event.queryStringParameters.id,
      },
    };

    await dynamoDb.delete(params).promise();

    return {
      statusCode: 204,
      body: JSON.stringify(null),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};
