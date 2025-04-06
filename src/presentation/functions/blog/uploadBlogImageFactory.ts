import { ImageUrlService } from "src/infrastructure/services/imageUrlService"
import { createS3ServiceFactory } from "../gallery/galleryFactory";
import { UploadBlogImage } from "src/useCases/blog/uploadBlogImage";

export const createUploadBlogImageUseCaseFactory = () => {
  const imageUrlService = new ImageUrlService();
  const storageService = createS3ServiceFactory();
  const createBlogImageUseCase = new UploadBlogImage(imageUrlService, storageService);
  return createBlogImageUseCase;
}
