import GalleryRepository from "src/domain/repositories/galleryRepository";
import { IImageUrlService } from "src/domain/services/imageUrlService";
import { IStorageService } from "src/domain/services/storageService";
import { BadRequestError } from "src/presentation/utils/customError";

export default class DeleteGallery {
  constructor(
    private readonly galleryRepository: GalleryRepository,
    private readonly storageService: IStorageService,
    private readonly imageUrlService: IImageUrlService
  ) {}

  async execute(id: string): Promise<void> {
    const gallery = await this.galleryRepository.get(id);

    if (!gallery) {
      throw new BadRequestError(`Post ${id} not found`);
    }

    const key = this.imageUrlService.buildKey(id, gallery.extension);

    await this.storageService.deleteItem(key);

    await this.galleryRepository.delete(id);
  }
}
