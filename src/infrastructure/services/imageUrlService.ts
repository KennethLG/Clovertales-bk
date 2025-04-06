import { IImageUrlService } from "src/domain/services/imageUrlService";

export class ImageUrlService implements IImageUrlService {
  buildKey(id: string, extension: string, basePath: string) {
    return `${basePath}/${id}.${extension}`;
  }
}
