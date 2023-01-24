import AWS from "aws-sdk";
import { SuccessResponseCS } from "src/helpers/responses";

export const handler = async () => {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  const result = await dynamoDb
    .scan({
      TableName: "Members",
    })
    .promise();
  const member = result.Items;

  return new SuccessResponseCS(
    {
      data: member,
    },
    "Members found successfully"
  );
};
