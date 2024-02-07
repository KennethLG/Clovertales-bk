import { Gallery } from "src/domain/entities/gallery";
import GalleryRepository from "src/domain/repositories/galleryRepository";

export default class GetGallery {
  constructor(private galleryRepository: GalleryRepository) {}

  async execute(): Promise<Gallery[]> {
    return await this.galleryRepository.getAll();
  }
}
