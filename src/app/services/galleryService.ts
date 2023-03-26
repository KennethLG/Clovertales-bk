import { Gallery } from "src/domain/entities/gallery";
import GalleryRepository from "src/domain/repositories/galleryRepository";
import { CreateGalleryDto } from "src/presentation/dto/galleryDto";
import { NotFoundError } from "src/presentation/utils/customError";
import { v4 as uuidv4 } from "uuid";

export class GalleryService {
  constructor(private readonly galleryRepository: GalleryRepository) {}

  async create(gallery: Partial<Gallery>) {
    const newGallery = new Gallery();
    newGallery.id = uuidv4();
    newGallery.createdAt = new Date().toISOString();
    newGallery.updatedAt = new Date().toISOString();
    newGallery.order = gallery.order || 0;
    newGallery.extension = gallery.extension || "";

    return await this.galleryRepository.create(newGallery);
  }

  async get(id: string): Promise<Gallery> {
    const item = await this.galleryRepository.get(id);

    if (!item) {
      throw new NotFoundError(`The item ${id} does not exist`);
    }

    return item;
  }

  async getAll() {
    return await this.galleryRepository.getAll();
  }

  async delete(id: string) {
    await this.galleryRepository.delete(id);
  }
}
