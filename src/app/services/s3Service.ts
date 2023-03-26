import AWS from "aws-sdk";
import config from "src/config";
import { v4 as uuid } from "uuid";

export class S3Service {
  private s3: AWS.S3;
  private bucketName: string;

  constructor(bucketName: string) {
    this.s3 = new AWS.S3();
    this.bucketName = bucketName;
  }

  async uploadItem(base64Item: string): Promise<string> {
    const buffer = this.createItemBuffer(base64Item);
    const data = await this.uploadToS3(buffer);
    return this.getCdnUrl(data.Location);
  }

  private async uploadToS3(Body: Buffer) {
    const params = {
      Bucket: this.bucketName,
      Key: `resources/blog/${uuid()}.png`,
      Body,
      ContentType: "image/png",
    };

    return await this.s3.upload(params).promise();
  }

  private getCdnUrl(location: string) {
    const s3Url = `https://${this.bucketName}.s3.amazonaws.com`;
    const cdnUrl = config.aws.cdn;
    return location.replace(s3Url, cdnUrl);
  }

  private createItemBuffer(base64Item: string) {
    return Buffer.from(base64Item.replace(/^data:image\/\w+;base64,/, ""), "base64");
  }
}
