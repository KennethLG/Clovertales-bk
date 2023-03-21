import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import AWS from "aws-sdk";

export const handler: APIGatewayProxyHandler = async (
  event,
  _context
): Promise<APIGatewayProxyResult> => {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  const TableName = "PostsTable";
  try {
    if (event.queryStringParameters && event.queryStringParameters.id) {
      const params: AWS.DynamoDB.DocumentClient.GetItemInput = {
        TableName,
        Key: {
          id: event.queryStringParameters.id,
        },
      };


      const result = await dynamoDb.get(params).promise();

      return {
        statusCode: 200,
        body: JSON.stringify(result.Item),
      };
    } else {
      const params = {
        TableName,
      };

      const result = await dynamoDb.scan(params).promise();

      return {
        statusCode: 200,
        body: JSON.stringify(result.Items),
      };
    }
  } catch (error) {

    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};
