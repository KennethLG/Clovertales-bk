import AWS from "aws-sdk";
import { SuccessResponseCS } from "src/helpers/responses";

export const handler = async () => {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  const params = {
    TableName: "Members",
    Key: {
      available: {
        BOOL: true,
      },
    },
  };

  const result = await dynamoDb.get(params).promise();

  const member = result.Item;

  return new SuccessResponseCS(
    {
      data: member,
    },
    "Members found successfully"
  );
};
