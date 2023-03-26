import { Gallery } from "src/domain/entities/gallery";
import GalleryRepository from "src/domain/repositories/galleryRepository";
import { CreateGalleryDto } from "src/presentation/dto/galleryDto";

export class GalleryService {
  constructor(private readonly galleryRepository: GalleryRepository) {}

  async create(gallery: CreateGalleryDto) {
    const newGallery = new Gallery();
    newGallery.image = gallery.image;
    newGallery.order = gallery.order;

    return await this.galleryRepository.create(newGallery);
  }
}
