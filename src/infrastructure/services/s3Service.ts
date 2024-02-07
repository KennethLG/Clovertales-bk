import AWS from "aws-sdk";
import config from "src/config";

export class S3Service {
  private s3: AWS.S3;
  private bucketName: string;

  constructor(bucketName: string) {
    this.s3 = new AWS.S3();
    this.bucketName = bucketName;
  }

  async uploadItem(base64Item: string, path: string): Promise<string> {
    const buffer = this.createItemBuffer(base64Item);
    const data = await this.uploadToS3(buffer, path);
    return this.getCdnUrl(data.Location);
  }

  async deleteItem(Key: string): Promise<void> {

    const params: AWS.S3.DeleteObjectRequest = {
      Bucket: this.bucketName,
      Key,
    };

    await this.s3.deleteObject(params).promise();
  }

  private async uploadToS3(Body: Buffer, Key: string) {
    const params: AWS.S3.PutObjectRequest = {
      Bucket: this.bucketName,
      Key,
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
