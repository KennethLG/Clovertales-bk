import { APIGatewayProxyEvent } from "aws-lambda";
import AWS from "aws-sdk";
import { SuccessResponseCS } from "src/helpers/responses";
import { Post } from "src/models/Post";
import { v4 as uuidv4 } from "uuid";

export const handler = async (event: APIGatewayProxyEvent) => {
  const body = JSON.parse(event.body as string) as Post;
  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  const post: Post = {
    ...body,
    id: body.id || uuidv4(),
    createdAt: body.createdAt || new Date().toISOString(),
  };

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
};
