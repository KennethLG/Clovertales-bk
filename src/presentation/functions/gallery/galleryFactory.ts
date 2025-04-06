import { ImageUrlService } from "src/infrastructure/services/imageUrlService";
import { S3Service } from "src/infrastructure/services/s3Service";
import config from "src/config";
import { Gallery } from "src/domain/entities/gallery";
import CreateGallery from "src/useCases/gallery/createGallery";
import DeleteGallery from "src/useCases/gallery/deleteGallery";
import GetGallery from "src/useCases/gallery/getGallery";
import { DynamoDbClient } from "src/infrastructure/database/dynamodb";
import GalleryRepositoryImpl from "src/infrastructure/repositories/galleryRepository";
import { UUIDService } from "src/infrastructure/services/uuidService";

export const createS3ServiceFactory = () => {
  const s3Service = new S3Service(config.aws.bucket);

  return s3Service;
}

export const galleryServicesFactory = () => {
  const dbClient = new DynamoDbClient<Gallery>("GalleryTable");
  const galleryRepository = new GalleryRepositoryImpl(dbClient);
  const s3Service = createS3ServiceFactory();
  const imageUrlService = new ImageUrlService();
  const uuidService = new UUIDService();
  return {
    galleryRepository,
    imageUrlService,
    s3Service,
    uuidService,
  };
};

export const createGalleryUseCaseFactory = () => {
  const { galleryRepository, imageUrlService, s3Service, uuidService } =
    galleryServicesFactory();
  const createGallery = new CreateGallery(
    galleryRepository,
    s3Service,
    imageUrlService,
    uuidService
  );
  return createGallery;
};

export const getGalleryUseCaseFactory = () => {
  const { galleryRepository } = galleryServicesFactory();
  const getGallery = new GetGallery(galleryRepository);
  return getGallery;
};
export const deleteGalleryUseCaseFactory = () => {
  const { galleryRepository, imageUrlService, s3Service } =
    galleryServicesFactory();
  const deleteGallery = new DeleteGallery(
    galleryRepository,
    s3Service,
    imageUrlService
  );
  return deleteGallery;
};
