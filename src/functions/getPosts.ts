import AWS from "aws-sdk";
import { SuccessResponseCS } from "src/helpers/responses";
import { Post } from "src/models/Post";

export const handler = async () => {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  const params: AWS.DynamoDB.DocumentClient.QueryInput = {
    TableName: "PostsTable",
  };

  const response = await dynamoDb.scan(params).promise();

  const result = response.Items as Post[];

  return new SuccessResponseCS(
    {
      data: result,
    },
    "Posts found successfully"
  );
};
