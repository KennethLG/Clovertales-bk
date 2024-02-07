import GalleryRepository from "src/domain/repositories/galleryRepository";
import { ImageUrlService } from "src/infrastructure/services/imageUrlService";
import { S3Service } from "src/infrastructure/services/s3Service";
import { BadRequestError } from "src/presentation/utils/customError";

export default class DeleteGallery {
  constructor(
    private readonly galleryRepository: GalleryRepository,
    private readonly s3Service: S3Service,
    private readonly imageUrlService: ImageUrlService
  ) {}

  async execute(id: string): Promise<void> {
    const gallery = await this.galleryRepository.get(id);

    if (!gallery) {
      throw new BadRequestError(`Post ${id} not found`);
    }

    const key = this.imageUrlService.buildKey(id, gallery.extension);

    await this.s3Service.deleteItem(key);

    await this.galleryRepository.delete(id);
  }
}
