import { GalleryService } from "src/infrastructure/services/galleryService";
import { Gallery } from "src/domain/entities/gallery";

export default class GetGallery {
  constructor(private galleryService: GalleryService) {}

  async execute(): Promise<Gallery[]> {
    return await this.galleryService.getAll();
  }
}
