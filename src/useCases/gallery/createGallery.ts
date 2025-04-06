import { Gallery } from "src/domain/entities/gallery";
import GalleryRepository from "src/domain/repositories/galleryRepository";
import { IStorageService } from "src/domain/services/storageService";
import { IImageUrlService } from "src/domain/services/imageUrlService";
import { IUUIDService } from "src/domain/services/uuidService";

export default class CreateGallery {
  constructor(
    private readonly galleryRepository: GalleryRepository,
    private readonly storageService: IStorageService,
    private readonly imageUrlService: IImageUrlService,
    private readonly uuidService: IUUIDService
  ) {}

  async execute(order: number, image: string): Promise<Gallery> {
    const extension = this.getExtensionFromBase64(image) || "png";

    const newGallery = new Gallery();
    newGallery.id = this.uuidService.generateId();
    newGallery.createdAt = new Date().toISOString();
    newGallery.updatedAt = new Date().toISOString();
    newGallery.order = order || 0;
    newGallery.extension = extension || "";

    const gallery = await this.galleryRepository.create(newGallery);

    const path = this.imageUrlService.buildKey(gallery.id, extension, "resources/gallery");
    await this.storageService.uploadItem(image, path);

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
