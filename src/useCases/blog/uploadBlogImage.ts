import { IImageUrlService } from "src/domain/services/imageUrlService";
import { IStorageService } from "src/domain/services/storageService";

export class UploadBlogImage {
  constructor(
    private readonly imageUrlService: IImageUrlService,
    private readonly storageService: IStorageService,
  ) {}
  async execute(image: string, name: string) {
    const extension = this.getExtensionFromBase64(image) || "png";
    const path = this.imageUrlService.buildKey(
      name,
      extension,
      "/resources/blog",
    );
    await this.storageService.uploadItem(image, path);
  }

  private getExtensionFromBase64(base64: string): string | null {
    const regex = /^data:image\/(\w+);base64,/;
    const match = base64.match(regex);

    if (match && match[1]) {
      return match[1];
    } else {
      return null;
    }
  }
}
