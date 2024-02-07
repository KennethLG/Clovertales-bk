import { Gallery } from "src/domain/entities/gallery";
import GalleryRepository from "src/domain/repositories/galleryRepository";
export class GalleryService {
  constructor(private readonly galleryRepository: GalleryRepository) {}

  async create(gallery: Gallery) {
    return await this.galleryRepository.create(gallery);
  }

  async get(id: string) {
    return await this.galleryRepository.get(id);

  }

  async getAll() {
    return await this.galleryRepository.getAll();
  }

  async delete(id: string) {
    await this.galleryRepository.delete(id);
  }
}
