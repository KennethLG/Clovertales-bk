import {
    _Object,
  DeleteObjectCommand,
  DeleteObjectCommandInput,
  ListObjectsV2Command,
  ListObjectsV2CommandInput,
  PutObjectCommand,
  PutObjectCommandInput,
  S3,
} from "@aws-sdk/client-s3";
import { IStorageService } from "src/domain/services/storageService";

export class S3Service implements IStorageService {
  private s3: S3;
  private bucketName: string;

  constructor(bucketName: string) {
    this.s3 = new S3();
    this.bucketName = bucketName;
  }

  async uploadItem(base64Item: string, path: string): Promise<void> {
    const buffer = this.createItemBuffer(base64Item);
    await this.uploadToS3(buffer, path);
  }

  async deleteItem(Key: string): Promise<void> {
    const params: DeleteObjectCommandInput = {
      Bucket: this.bucketName,
      Key,
    };

    const command = new DeleteObjectCommand(params);

    await this.s3.send(command);
  }

  async getItems(prefix = "") {
    const params: ListObjectsV2CommandInput = {
      Bucket: this.bucketName,
      Prefix: prefix,
    };

    const command = new ListObjectsV2Command(params);
    const response = await this.s3.send(command);
    if (!response.Contents) {
      return [];
    }
    return this.getImageUrlsList(response.Contents);
  }

  private getImageUrlsList(objects: _Object[]) {
    const region = "us-east-1";
    return objects.filter(
      (obj) => obj.Key && !obj.Key.endsWith("/"),
    ).map(
        (obj) =>
          `https://${this.bucketName}.s3.${region}.amazonaws.com/${obj.Key}`,
      );
  }

  private async uploadToS3(Body: Buffer, Key: string) {
    const params: PutObjectCommandInput = {
      Bucket: this.bucketName,
      Key,
      Body,
      ContentType: "image/png",
    };

    const command = new PutObjectCommand(params);

    return await this.s3.send(command);
  }

  private createItemBuffer(base64Item: string) {
    return Buffer.from(
      base64Item.replace(/^data:image\/\w+;base64,/, ""),
      "base64",
    );
  }
}
