import { APIGatewayProxyHandler } from "aws-lambda";
import AWS from "aws-sdk";
import config from "src/config";
import { v4 as uuid } from "uuid";

const s3 = new AWS.S3();
const bucketName = config.aws.bucket;

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const body = JSON.parse(event.body ?? "");
    const order = body.order;
    const image = body.image;

    const base64Image = image.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Image, "base64");
    const key = `resources/blog/${uuid()}.png`;

    const params = {
      Bucket: bucketName,
      Key: key,
      Body: buffer,
      ContentType: "image/png"
    };

    const data = await s3.upload(params).promise();

    const response = {
      statusCode: 201,
      body: JSON.stringify({ location: data.Location }),
    };
    return response;
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error" }),
    };
  }
};
