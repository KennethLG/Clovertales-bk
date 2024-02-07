import { IImageUrlService } from "src/domain/services/imageUrlService";

export class ImageUrlService implements IImageUrlService {
  constructor(private readonly basePath: string) {}

  buildKey(id: string, extension: string) {
    return `${this.basePath}/${id}.${extension}`;
  }
}
