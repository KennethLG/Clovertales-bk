import AWS from "aws-sdk";
import { v4 as uuid } from "uuid";

export class S3ServiceImpl {
  private s3: AWS.S3;
  private bucketName: string;

  constructor(bucketName: string) {
    this.s3 = new AWS.S3();
    this.bucketName = bucketName;
  }

  async uploadImage(base64Image: string): Promise<string> {
    const buffer = Buffer.from(
      base64Image.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    );
    const key = `resources/blog/${uuid()}.png`;

    const params = {
      Bucket: this.bucketName,
      Key: key,
      Body: buffer,
      ContentType: "image/png",
    };

    const data = await this.s3.upload(params).promise();

    return data.Location;
  }
}
