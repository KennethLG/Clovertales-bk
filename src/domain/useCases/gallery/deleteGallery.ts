import { GalleryService } from "src/app/services/galleryService";
import { S3Service } from "src/app/services/s3Service";
import { Gallery } from "src/domain/entities/gallery";
import { CreateGalleryDto } from "src/presentation/dto/galleryDto";

export default class DeleteGallery {
  constructor(
    private galleryService: GalleryService,
    private s3Service: S3Service
  ) {}

  async execute(id: string): Promise<void> {

    const gallery = await this.galleryService.get(id);

    const key = `resources/blog/${gallery.id}.${gallery.extension}`;

    await this.s3Service.deleteItem(key);

    await this.galleryService.delete(id);
  }
}
