import { APIGatewayProxyEvent } from "aws-lambda";
import AWS from "aws-sdk";
import { SuccessResponseCS } from "src/helpers/responses";
import { Post } from "src/models/Post";

export const handler = async (event: APIGatewayProxyEvent) => {
  const body = JSON.parse(event.body as string);

  const post: Post = {
    ...body,
    createdAt: new Date().toISOString(),
  };

  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  try {
    const params: AWS.DynamoDB.DocumentClient.PutItemInput = {
      TableName: "PostsTable",
      Item: post,
    };

    const response = await dynamoDb.put(params).promise();

    const result = response.Attributes as Post;

    return new SuccessResponseCS(
      {
        data: result,
      },
      "Post created successfully"
    );
  } catch (error) {
    console.log(error);
    return new Error(error as string);
  }
};
