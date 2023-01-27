import AWS from "aws-sdk";
import { SuccessResponseCS } from "src/helpers/responses";

export const handler = async () => {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  const params: AWS.DynamoDB.DocumentClient.GetItemInput = {
    TableName: "Platforms",
    Key: {
      available: {
        BOOL: true,
      },
    },
  };

  const result = await dynamoDb.get(params).promise();

  const platforms = result.Item;

  return new SuccessResponseCS(
    {
      data: platforms,
    },
    "Platforms found successfully"
  );
};
