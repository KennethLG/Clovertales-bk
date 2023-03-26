import { GalleryService } from "src/app/services/galleryService";
import { Gallery } from "src/domain/entities/gallery";
import { CreateGalleryDto } from "src/presentation/dto/galleryDto";

export default class CreateGallery {
  constructor(private galleryService: GalleryService) {}

  async execute(input: CreateGalleryDto): Promise<Gallery> {
    return await this.galleryService.create(input);
  }
}
