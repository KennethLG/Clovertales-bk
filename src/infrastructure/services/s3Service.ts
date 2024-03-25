import { DeleteObjectCommand, DeleteObjectCommandInput, PutObjectCommand, PutObjectCommandInput, S3 } from "@aws-sdk/client-s3";
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
      "base64"
    );
  }
}
