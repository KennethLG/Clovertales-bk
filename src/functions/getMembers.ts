import AWS from "aws-sdk";
import { SuccessResponseCS } from "src/helpers/responses";
import { Member } from "src/models/Member";

export const handler = async () => {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  const params: AWS.DynamoDB.DocumentClient.QueryInput = {
    TableName: "MembersTable",
  };

  const response = await dynamoDb.scan(params).promise();

  const result = response.Items as Member[];

  const members = result.filter((member) => member.available);

  return new SuccessResponseCS(
    {
      data: members,
    },
    "Members found successfully"
  );
};
