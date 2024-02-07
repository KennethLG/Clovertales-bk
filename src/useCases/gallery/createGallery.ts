import { ImageUrlService } from "src/infrastructure/services/imageUrlService";
import { S3Service } from "src/infrastructure/services/s3Service";
import { Gallery } from "src/domain/entities/gallery";
import { CreateGalleryDto } from "src/presentation/dto/galleryDto";
import { v4 as uuidv4 } from "uuid";
import GalleryRepository from "src/domain/repositories/galleryRepository";

export default class CreateGallery {
  constructor(
    private readonly galleryRepository: GalleryRepository,
    private readonly s3Service: S3Service,
    private readonly imageUrlService: ImageUrlService
  ) {}

  async execute({ order, image }: CreateGalleryDto): Promise<Gallery> {
    const extension = this.getExtensionFromBase64(image) || "png";

    const newGallery = new Gallery();
    newGallery.id = uuidv4();
    newGallery.createdAt = new Date().toISOString();
    newGallery.updatedAt = new Date().toISOString();
    newGallery.order = order || 0;
    newGallery.extension = extension || "";

    const gallery = await this.galleryRepository.create(newGallery);

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
