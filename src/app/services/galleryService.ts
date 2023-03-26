import { Gallery } from "src/domain/entities/gallery";
import GalleryRepository from "src/domain/repositories/galleryRepository";
import { CreateGalleryDto } from "src/presentation/dto/galleryDto";
import { v4 as uuidv4 } from "uuid";

export class GalleryService {
  constructor(private readonly galleryRepository: GalleryRepository) {}

  async create(gallery: CreateGalleryDto) {
    const newGallery = new Gallery();
    newGallery.id = uuidv4();
    newGallery.createdAt = new Date().toISOString();
    newGallery.updatedAt = new Date().toISOString();
    newGallery.image = gallery.image;
    newGallery.order = gallery.order;

    return await this.galleryRepository.create(newGallery);
  }

  async getAll() {
    return await this.galleryRepository.getAll();
  }
}
