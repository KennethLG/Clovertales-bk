import { GalleryService } from "src/app/services/galleryService";
import { S3Service } from "src/app/services/s3Service";
import config from "src/config";
import { Gallery } from "src/domain/entities/gallery";
import CreateGallery from "src/domain/useCases/gallery/createGallery";
import DeleteGallery from "src/domain/useCases/gallery/deleteGallery";
import GetGallery from "src/domain/useCases/gallery/getGallery";
import { DynamoDbClient } from "src/infrastructure/database/dynamodb";
import GalleryRepositoryImpl from "src/infrastructure/repositories/galleryRepository";

export const galleryServiceUseCaseFactory = () => {
  const dbClient = new DynamoDbClient<Gallery>("GalleryTable");
  const galleryRepository = new GalleryRepositoryImpl(dbClient);
  const galleryService = new GalleryService(galleryRepository);
  return galleryService;
};

export const s3ServiceFactory = () => {
  return new S3Service(config.aws.bucket);
};

export const createGalleryUseCaseFactory = () => {
  const galleryService = galleryServiceUseCaseFactory();
  const s3Service = s3ServiceFactory();
  const createGallery = new CreateGallery(galleryService, s3Service);
  return createGallery;
};

export const getGalleryUseCaseFactory = () => {
  const galleryService = galleryServiceUseCaseFactory();
  const getGallery = new GetGallery(galleryService);
  return getGallery;
}
export const deleteGalleryUseCaseFactory = () => {
  const s3Service = s3ServiceFactory();
  const galleryService = galleryServiceUseCaseFactory();
  const deleteGallery = new DeleteGallery(galleryService, s3Service);
  return deleteGallery;
}