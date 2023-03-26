import { GalleryService } from "src/app/services/galleryService";
import { ImageUrlService } from "src/app/services/imageUrlService";
import { S3Service } from "src/app/services/s3Service";
import config from "src/config";
import { Gallery } from "src/domain/entities/gallery";
import CreateGallery from "src/domain/useCases/gallery/createGallery";
import DeleteGallery from "src/domain/useCases/gallery/deleteGallery";
import GetGallery from "src/domain/useCases/gallery/getGallery";
import { DynamoDbClient } from "src/infrastructure/database/dynamodb";
import GalleryRepositoryImpl from "src/infrastructure/repositories/galleryRepository";

export const galleryServicesFactory = () => {
  const dbClient = new DynamoDbClient<Gallery>("GalleryTable");
  const galleryRepository = new GalleryRepositoryImpl(dbClient);
  const galleryService = new GalleryService(galleryRepository);
  const s3Service = new S3Service(config.aws.bucket);
  const imageUrlService = new ImageUrlService("resources/gallery");
  return {
    galleryService,
    imageUrlService,
    s3Service
  };
};

export const createGalleryUseCaseFactory = () => {
  const { galleryService, imageUrlService, s3Service } = galleryServicesFactory();
  const createGallery = new CreateGallery(
    galleryService,
    s3Service,
    imageUrlService
  );
  return createGallery;
};

export const getGalleryUseCaseFactory = () => {
  const { galleryService } = galleryServicesFactory();
  const getGallery = new GetGallery(galleryService);
  return getGallery;
}
export const deleteGalleryUseCaseFactory = () => {
  const { galleryService, imageUrlService, s3Service} = galleryServicesFactory();
  const deleteGallery = new DeleteGallery(
    galleryService,
    s3Service,
    imageUrlService
  );
  return deleteGallery;
}