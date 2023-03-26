import { GalleryService } from "src/app/services/galleryService";
import { S3Service } from "src/app/services/s3Service";
import { Gallery } from "src/domain/entities/gallery";
import { CreateGalleryDto } from "src/presentation/dto/galleryDto";

export default class CreateGallery {
  constructor(private galleryService: GalleryService, private s3Service: S3Service) {}

  async execute(input: CreateGalleryDto): Promise<Gallery> {

    await this.s3Service.uploadImage(input.image);

    return await this.galleryService.create(input);
  }
}
