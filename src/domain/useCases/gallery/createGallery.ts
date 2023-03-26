import { GalleryService } from "src/app/services/galleryService";
import { S3Service } from "src/app/services/s3Service";
import { Gallery } from "src/domain/entities/gallery";
import { CreateGalleryDto } from "src/presentation/dto/galleryDto";
import { v4 as uuid } from "uuid";

export default class CreateGallery {
  constructor(
    private galleryService: GalleryService,
    private s3Service: S3Service
  ) {}

  async execute(input: CreateGalleryDto): Promise<Gallery> {
    const imageExtension = this.getExtensionFromBase64(input.image);
    const path = `resources/blog/${uuid()}.${imageExtension || 'png'}`;

    const imageLocation = await this.s3Service.uploadItem(input.image, path);

    return await this.galleryService.create({
      image: imageLocation,
      order: input.order,
    });
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
