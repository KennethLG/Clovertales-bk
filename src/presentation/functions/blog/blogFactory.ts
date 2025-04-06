import { ImageUrlService } from "src/infrastructure/services/imageUrlService"
import { createS3ServiceFactory } from "../gallery/galleryFactory";
import { UploadBlogImage } from "src/useCases/blog/uploadBlogImage";
import { GetBlogImages } from "src/useCases/blog/getBlogImages";

export const createGetImagesUseCaseFactory = () => {
  const storageService = createS3ServiceFactory()
  const getImagesUseCase = new GetBlogImages(storageService);
  return getImagesUseCase;
}

export const createUploadBlogImageUseCaseFactory = () => {
  const imageUrlService = new ImageUrlService();
  const storageService = createS3ServiceFactory();
  const createBlogImageUseCase = new UploadBlogImage(imageUrlService, storageService);
  return createBlogImageUseCase;
}
