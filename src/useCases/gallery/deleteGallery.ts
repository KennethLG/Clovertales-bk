import { GalleryService } from "src/infrastructure/services/galleryService";
import { ImageUrlService } from "src/infrastructure/services/imageUrlService";
import { S3Service } from "src/infrastructure/services/s3Service";

export default class DeleteGallery {
  constructor(
    private readonly galleryService: GalleryService,
    private readonly s3Service: S3Service,
    private readonly imageUrlService: ImageUrlService
  ) {}

  async execute(id: string): Promise<void> {
    const gallery = await this.galleryService.get(id);

    const key = this.imageUrlService.buildKey(id, gallery.extension);

    await this.s3Service.deleteItem(key);

    await this.galleryService.delete(id);
  }
}
