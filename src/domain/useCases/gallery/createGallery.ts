import { GalleryService } from "src/app/services/galleryService";
import { ImageUrlService } from "src/app/services/imageUrlService";
import { S3Service } from "src/app/services/s3Service";
import { Gallery } from "src/domain/entities/gallery";
import { CreateGalleryDto } from "src/presentation/dto/galleryDto";

export default class CreateGallery {
  constructor(
    private readonly galleryService: GalleryService,
    private readonly s3Service: S3Service,
    private readonly imageUrlService: ImageUrlService
  ) {}

  async execute({ order, image }: CreateGalleryDto): Promise<Gallery> {
    const extension = this.getExtensionFromBase64(image) || "png";
    const gallery = await this.galleryService.create({
      order,
      extension,
    });
    const path = this.imageUrlService.buildKey(gallery.id, extension);
    await this.s3Service.uploadItem(image, path);

    return gallery;
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
