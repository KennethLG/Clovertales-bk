import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import AWS from "aws-sdk";

export const editPost: APIGatewayProxyHandler = async (
  event
): Promise<APIGatewayProxyResult> => {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  try {
    const { postId, title, description, content, imageUrl } = JSON.parse(
      event.body as string
    );

    const params = {
      TableName: "PostsTable",
      Key: { id: postId },
      UpdateExpression: "set #t = :t, #d = :d, #c = :c, #i = :i, #uA = :uA",
      ExpressionAttributeNames: {
        "#t": "title",
        "#d": "description",
        "#c": "content",
        "#i": "imageUrl",
        "#uA": "updatedAt",
      },
      ExpressionAttributeValues: {
        ":t": title,
        ":d": description,
        ":c": content,
        ":i": imageUrl,
        ":uA": new Date().toISOString(),
      },
      ReturnValues: "ALL_NEW",
    };

    const result = await dynamoDb.update(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify(result.Attributes),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};
