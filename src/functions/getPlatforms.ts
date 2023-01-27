import AWS from "aws-sdk";
import { SuccessResponseCS } from "src/helpers/responses";
import { Platform } from "src/models/Platforms";

export const handler = async () => {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  const params: AWS.DynamoDB.DocumentClient.QueryInput = {
    TableName: "PlatformsTable",
  };

  const response = await dynamoDb.scan(params).promise();

  const result = response.Items as Platform[];

  const platforms = result.filter((platform) => platform.available);

  return new SuccessResponseCS(
    {
      data: platforms,
    },
    "Platforms found successfully"
  );
};
