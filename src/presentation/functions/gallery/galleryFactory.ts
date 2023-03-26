import { GalleryService } from "src/app/services/galleryService";
import { S3ServiceImpl } from "src/app/services/s3Service";
import config from "src/config";
import { Gallery } from "src/domain/entities/gallery";
import CreateGallery from "src/domain/useCases/gallery/createGallery";
import { DynamoDbClient } from "src/infrastructure/database/dynamodb";
import GalleryRepositoryImpl from "src/infrastructure/repositories/galleryRepository";

export const createGalleryUseCaseFactory = () => {
  const dbClient = new DynamoDbClient<Gallery>("GalleryTable");
  const galleryRepository = new GalleryRepositoryImpl(dbClient);
  const galleryService = new GalleryService(galleryRepository);
  const createGallery = new CreateGallery(galleryService)
  return createGallery;
}

export const s3ServiceFactory = () => {
  return new S3ServiceImpl(config.aws.bucket);
}