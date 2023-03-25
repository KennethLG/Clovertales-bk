import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";

export const handler: APIGatewayProxyHandler = async (
  event
): Promise<APIGatewayProxyResult> => {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  try {
    const { title, description, content, imageUrl } = JSON.parse(
      event.body as string
    );

    const params = {
      TableName: "PostsTable",
      Item: {
        id: uuidv4(),
        title,
        description,
        content,
        imageUrl,
        available: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    };

    await dynamoDb.put(params).promise();

    return {
      statusCode: 201,
      body: JSON.stringify(params.Item),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};
